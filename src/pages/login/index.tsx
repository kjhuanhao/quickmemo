import logo from '@/assets/svg/logo.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginReq } from '@/api/login'
import { Toast } from '@/components/Toast'
import { successToast } from '@/utils'

type FormValues = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = data => {
    loginReq(data).then(res => {
      successToast('登入成功', 3000)
      window.localStorage.setItem('accessToken', res.accessToken)
      window.localStorage.setItem('refreshToken', res.refreshToken)
      nav('/')
    })
  }
  const nav = useNavigate()
  return (
    <div>
      <Toast />
      <section className='fixed w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a href='#' className='flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white'>
            <img className='w-8 h-8 mr-2' src={logo} alt='logo' />
            QuickMemo
          </a>
          <div className='max-w-[1000px] w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                登录
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>邮箱</label>
                  <Input
                    type='email'
                    {...register('email', {
                      required: '邮箱是必填项',
                      pattern: { value: /^\S+@\S+$/i, message: '请输入有效的邮箱地址' }
                    })}
                    className='border border-slate-400'
                    placeholder='xxxx@xx.com'
                  />
                  {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>密码</label>
                  <Input
                    type='password'
                    {...register('password', {
                      required: '密码是必填项',
                      minLength: { value: 8, message: '密码至少需要8个字符' }
                    })}
                    className='border border-slate-400'
                    placeholder='••••••••'
                  />
                  {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'></div>
                  <a
                    onClick={() => nav('/forget')}
                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer'
                  >
                    忘记密码?
                  </a>
                </div>
                <Button type='submit' className='w-full'>
                  登录
                </Button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  没有账号?{' '}
                  <a
                    onClick={() => nav('/register')}
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer'
                  >
                    立即注册
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
