var vm = new Vue({
	el: "#app",
	data: {
		limitNum:3,
		addressList: [],
		cureentIndex:0,
		shippingMethods:1
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getAddressList();
		})

	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddressList: function() {
			var _this = this;
			axios.get("data/address-data.json").then(function(response) {
				var res = response.data;
				if (res.status = "0") {
					_this.addressList = res.result;
				}
			})
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(item,index){
				if(item.addressId==addressId){
					item.isDefault=true;
				}else{
					item.isDefault=false;
				}
			})

		}
	}
})