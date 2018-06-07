<template>
	<div class="container">
	    <Form class="form" :model="formData" :rules="ruleCustom" :label-width="80">
	        <FormItem label="Name" prop="name">
	            <Input placeholder="Enter Your Name" v-model="formData.nickname"></Input>
	        </FormItem>
	        <FormItem label="Account" prop="account">
	            <Input placeholder="Enter Your Account" v-model="formData.account"></Input>
	        </FormItem>
	        <FormItem label="Password">
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
	        	<Upload action="/api/common/uploadfile" :headers="csrfToken" name="avatar" accept="image/*" :show-upload-list="false">
					<Button type="ghost" icon="ios-cloud-upload-outline">Upload avatar</Button>
				</Upload>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="submit">Submit</Button>
	            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
	        </FormItem>
	    </Form>
	</div>
</template>

<script>
export default {
	name: 'SignUp',
	data () {
		const validateAcc = (rule, value, callback) => {
			console.log(rule)
            if (!value) {
                return callback(new Error('Cannot be empty'));
            }
            let params = {
            	url: '/api/user/checkUser',
            	data: {value: value, type: 1}
            }
            this.axios(params).then(res => {
            	callback()
            }, err => {
            	callback(new Error('The account already exists'));
            })
        };
		return {
			formData: {
				nickname: null,
				account: null,
				password: null,
				birthday: null,
				gender: null,
			},
			ruleCustom: {
				account: [
                    { validator: validateAcc, trigger: 'blur' }
                ]
			},
			csrfToken: {'x-csrf-token': this.$cookies.get('csrfToken')}
		}
	},
	methods: {
		submit() {
			let params = {
				url: '/api/user/signup',
				type: 'post',
				data: this.formData
			}
			this.axios(params).then(res => {
				if(res.code == 200) this.$router.push('home')
			})
		},
		datepick(val) {
			this.formData.birthday = val
		}
	}
}
</script>

<style scoped>
.form{
	width: 500px;
}
</style>