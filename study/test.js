import * as iakit from 'iakit'
import 'iakit/dist/style.css'
import { queryWithdrawInfo, applyRansomeInfo } from 'services'
import create from './index.tpl'
import './index.styl'
import myInput from '../../components/myinput/index.js'
import myButton from '../../components/mybutton/index.js'

export default create({
  components: {
    'demo-input': myInput,
    'demo-button': myButton
  },
  data() {
    return {
      data: {},
      isActive: false,
      withdrawMoney: ''
    }
  },

  created() {
    queryWithdrawInfo().then((resp) => {
      this.data = resp
      console.log(resp)
      if (this.data.sum_money > 0) {
        this.isActive = true
      }
    }).catch((err) => {
      iakit.alert('', err.message, [
        {
          text: '朕知道了'
        }
      ])
    })
  },
  methods: {
    vilidate() {
      var self = this
      console.log(this.withdrawMoney)
      console.log(this.data.sum_money);
      if (this.withdrawMoney > this.data.sum_money) {
        iakit.alert('', '提现金额不足', [
          {
            text: '朕知道了'
          }
        ])
      } else {
        applyRansomeInfo({ 'money': this.withdrawMoney }).then((resp) => {
          iakit.alert(
            '',
            '正在赎回，请注意查收短信',
            [
              { text: '朕知道了', onClick: () => {
                self.$router.push({ path: '/withdraw' })
              } }
            ]
          )
        }).catch((err) => {
          this.$dialog.alert('提示', err.message)
        })
      }
    }
  }
})
