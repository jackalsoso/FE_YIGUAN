import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const state = {
  upload_list: [],
  addIndex: 0,
	
}
	
const getters = {
	get_upload_list: state => state.upload_list,
  get_add_index: state => state.addIndex
}
	
const actions = {
	//请求相关内容
	// requestCorrelation: ({commit,state}) => {
	// 	//commit('setCorrelation',result);
		
	// },
		
}
	
const mutations = {
	set_upload_list: (state,data) => {
		state.upload_list = data;
	},
	set_add_index: (state,index) => {
    state.addIndex = index;
  }
	
	
}
	

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}



