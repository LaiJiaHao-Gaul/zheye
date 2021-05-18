<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailVal"
        placeholder="请输入邮箱地址"
        type="text"
        ref="inputRef"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input
        type="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        v-model="passwordVal"
      />
    </div>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import createMessage from '../components/createMessage'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登陆成功 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
