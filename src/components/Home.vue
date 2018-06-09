<template>
	<div class="layout">
        <Layout>
    		<Menu class="nav" mode="horizontal" theme="light" active-name="index">
    			<Button type="primary" @click="modal = true" icon="edit">send</Button>
                <Tooltip class="logout" content="logout" placement="bottom-end">
                    <Button type="ghost" shape="circle" size="small" icon="log-out" @click="logout"></Button>
                </Tooltip>
                <MenuItem class="menuItem" name="profile">
                    <img class="headimg" width="30" :src="userInfo.headurl">
                    {{userInfo.nickname}}
                </MenuItem>
                <MenuItem class="menuItem" name="index">
                    <Icon type="aperture"></Icon>
                    Index
                </MenuItem>
            </Menu>
            <Content class="content">
                <Card :padding="8" class="m-b-20" v-for="v,i in contents" :key="i">
                    <img class="headimg" width="30" :src="v.headurl || defaultAvatar">
                    <h4 :style="{display: 'inline-block'}">{{v.nickname}}</h4>
                    <div class="cardBody">{{v.content}}</div>
                    <div class="cardFoot">更新于{{v.update_time}}</div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2018 &copy; Suunryo</Footer>
        </Layout>

		<Modal
		    v-model="modal"
		    title="write something.."
		    ok-text="send"
		    cancel-text="cancel"
            loading="loading"
		    @on-ok="addContent"
            @keyup.enter.native.prevent="addContent">
		    <Input v-model="editArea" type="textarea" :rows="4" placeholder="=v="></Input>
		</Modal>
    </div>
</template>

<script>
export default{
	name: 'Home',
	data() {
		return {
            userInfo: '',
            contents: '',
			modal: false,
            editArea: '',
            defaultAvatar: require('./../assets/default_avatar.jpg')
		}
	},
	mounted() {
        this.getUserInfo()
        this.getContent()
    },
	methods: {
		getContent() {
			let params = {
				url: '/api/content/page',
			}
			this.axios(params).then(res => {
			     this.contents = res.result
			}, err => {
			
			})
		},
        getUserInfo() {
            let config = {
                url: '/api/user/getUserInfo'
            }
            this.axios(config).then(res => {
                this.userInfo = res.result
            }, err => {
                throw err
            })
        },
        logout() {
            let config = {
                url: '/api/user/logout'
            }
            this.axios(config).then(res => {
                if(res.code == 200) {
                    this.$Message.info('logout success !');
                    this.$router.replace('login')
                }
            }, err => {
                throw err
            })
        },
		addContent() {
            let config = {
                url: '/api/content/add',
                type: 'post',
                data: {
                    user_id: this.userInfo.id,
                    content: this.editArea
                }
            }
            this.axios(config).then(res => {
                if(res.code == 200){
                    this.editArea = ''
                    this.getContent()
                }else{
                    this.$Message.warn(res.msg)
                }
                this.modal = false
            }, err => {
                this.modal = false
                throw err
            })
        },
	}
}
</script>

<style scoped>
    .layout{
    	height: 100%;
    }
    .layout-nav{
        overflow: hidden;
    }
    .nav{
        padding-left: 20px;
        position: fixed;
        width: 100%;
    }
    .logout{
        float: right;
        margin-right: 10px;
    }
    .menuItem{
    	float: right;
    }
    .headimg{
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 6px;
    }
    .content{
    	width: 80%;
    	height: 100%;
    	padding: 20px;
    	margin: 60px auto 0;
    	background-color: #fff;
    }
    .cardBody{
        padding: 12px 8px;
    }
    .cardFoot{
        font-size: 12px;
        padding-top: 5px;
        text-align: right;
        border-top: 1px solid #dcdcdc;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>