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
                Content
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
		    <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..."></Input>
		</Modal>
    </div>
</template>

<script>
export default{
	name: 'Home',
	data() {
		return {
			msg: 'home',
			modal1: false
		}
	},
	mounted() {},
	methods: {
		test() {
			let params = {
				url: '/api/user/test',
			}
			this.axios(params).then(res => {
			
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
    .layout-footer-center{
        text-align: center;
    }
</style>