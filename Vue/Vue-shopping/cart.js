var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAll: false,
        delFlag: false,
        curProduct: ''
    },
    filters: {
        formatMoney: function(value, type) {
            return "￥" + value.toFixed(2) + type;

        }

    },
    mounted: function() {
        this.$nextTick(function() {
            this.cartView();
        })

    },
    methods: {
        cartView: function() {
            var _this = this;
            axios.get("data/cart-data.json").then(function(res) {
                _this.productList = res.data.result.list;

            })
        },
        changeMoney: function(item, type) {
            if (item.productQuantity != 0) {
                if (type < 0) {
                    if (item.productQuantity <= 1) {
                        item.productQuantity = 1;

                    } else {
                        item.productQuantity = item.productQuantity + type;
                    }
                } else {
                    item.productQuantity = item.productQuantity + type;
                }

            }



            this.calcTotalPrice();


        },
        selectProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
                if (item.checked == false) {
                    this.checkAll = false
                }
            }
            this.calcTotalPrice();
        },
        selectAll: function() {
            this.checkAll = !this.checkAll;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, "checked", _this.checkAll);
                } else {
                    item.checked = _this.checkAll;
                }

            })
            this.calcTotalPrice();

        },
        calcTotalPrice: function() {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }

            })
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;


        },
        delProduct: function() {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            $('#myModal').modal('hide');
            this.calcTotalPrice();
        }

    }
})