<template>
	<div class="layout">
        <Layout :style="{height: '100%'}">
    		<Menu :style="{paddingLeft: '20px'}" mode="horizontal" theme="light" active-name="1">
    			<Button type="primary" @click="modal1 = true" icon="edit">send</Button>
                <MenuItem class="menuItem" name="profile">
                    <Icon type="ios-keypad"></Icon>
                    name
                </MenuItem>
                <MenuItem class="menuItem" name="index">
                    <Icon type="aperture"></Icon>
                    Index
                </MenuItem>
            </Menu>
            <Content class="content">
                <Card :padding="8" class="m-b-20" v-for="v,i in contents" :key="i">
                    <h4>{{v.user_name}}</h4>
                    <div class="cardBody">{{v.content}}</div>
                    <div class="cardFoot">{{v.update_time}}</div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2018 &copy; Suunryo</Footer>
        </Layout>

		<Modal
		    v-model="modal1"
		    title="input your content"
		    ok-text="send"
		    cancel-text="cancel"
		    @on-ok="ok"
		    @on-cancel="cancel">
		    <Input v-model="editArea" type="textarea" :rows="4" placeholder="Enter something..."></Input>
		</Modal>
    </div>
</template>

<script>
export default{
	name: 'Home',
	data() {
		return {
			msg: 'home',
            contents: '',
			modal1: false,
            editArea: ''
		}
	},
	mounted() {
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
		ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
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
    .menuItem{
    	float: right;
    }
    .content{
    	width: 80%;
    	height: 100%;
    	padding: 20px;
    	margin: 0 auto;
    	background-color: #fff;
    }
    .cardBody{
        padding: 12px 8px;
    }
    .cardFoot{
        padding-top: 5px;
        font-size: 14px;
        text-align: right;
        border-top: 1px solid #dcdcdc;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>