<template>
	<div class="container">
	    <Form class="form" :model="formData" :rules="ruleCustom" :label-width="80">
	        <FormItem label="Name" prop="nickname">
	            <Input placeholder="Enter Your Name" v-model="formData.nickname"></Input>
	        </FormItem>
	        <FormItem label="Account" prop="account">
	            <Input placeholder="Enter Your Account" v-model="formData.account"></Input>
	        </FormItem>
	        <FormItem label="Password" prop="password">
	            <Input type="password" placeholder="Enter Your Password" v-model="formData.password"></Input>
	        </FormItem>
	        <FormItem label="Birthday">
                <DatePicker type="date" placeholder="Select date" format="yyyy-MM-dd" v-model="formData.birthday" @on-change="datepick"></DatePicker>
	        </FormItem>
	        <FormItem label="Gender">
	            <RadioGroup  v-model="formData.gender">
	                <Radio label="male">Male</Radio>
	                <Radio label="female">Female</Radio>
	            </RadioGroup>
	        </FormItem>
	        <FormItem label="Avatar">
	        	<Upload action="/api/common/uploadfile" :headers="csrfToken" name="avatar" accept="image/*" :show-upload-list="false" :on-success="uploadSuccess">
					<img class="uploadImg" :src="formData.headurl || defaultAvatar">
				</Upload>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="submit" long>Submit</Button>
	        </FormItem>
	    </Form>
	</div>
</template>

<script>
export default {
	name: 'SignUp',
	data () {
		const validateAcc = (rule, value, callback) => {
			console.log(rule, value)
            if (!value) {
                return callback(new Error('Cannot be empty'));
            }
            let params = {
            	url: '/api/user/checkUser',
            	data: {value: value}
            }
            params.data.type = rule.field == 'account' ? 1 : 2
            this.axios(params).then(res => {
            	this.nameFlag = true
            	callback()
            }, err => {
            	this.nameFlag = false
            	callback(new Error(`The ${rule.field} already exists`));
            })
        };
        const validPwd = (rule, value, callback) => {
        	if (!value) {
                return callback(new Error('Cannot be empty'));
            }
            if(value.length < 6){
            	return callback(new Error('At least 6 digits'));
            }
            callback()
        }
		return {
			formData: {
				nickname: null,
				account: null,
				password: null,
				birthday: null,
				gender: null,
				headurl: null
			},
			ruleCustom: {
				account: [
                    { validator: validateAcc, trigger: 'blur' }
                ],
                nickname: [
                    { validator: validateAcc, trigger: 'blur' }
                ],
                password: [
                    { validator: validPwd, trigger: 'blur' }
                ],
			},
			nameFlag: false,
			csrfToken: {'x-csrf-token': this.$cookies.get('csrfToken')},
			defaultAvatar: require('./../assets/default_avatar.jpg')
		}
	},
	methods: {
		submit() {
			if(!this.nameFlag){
				this.$Modal.warning({
                    title: 'WARN',
                    content: '<p>Pleas input account / nickname</p><p>Or same account / nickname already exists</p>'
                });
			}
			let params = {
				url: '/api/user/signup',
				type: 'post',
				data: this.formData
			}
			return
			this.axios(params).then(res => {
				if(res.code == 200) this.$router.push('home')
			})
		},
		datepick(val) {
			this.formData.birthday = val
		},
		uploadSuccess(res) {
			if(res.code == 200) this.formData.headurl = res.result
		}
	}
}
</script>

<style scoped>
.form{
	width: 500px;
}
.uploadImg{
	width: 80px;
	height: 80px;
	cursor: pointer;
}
</style>