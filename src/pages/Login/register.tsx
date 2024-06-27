import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import logo from '@/assets/svg/logo.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { successToast } from '@/utils'
import { Toast } from '@/components/Toast'
import { getCodeReq, registerReq } from '@/api/login'

type FormValues = RegisterRequest

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm<FormValues>()
  const [canSendCode, setCanSendCode] = useState(true)
  const [timer, setTimer] = useState(0)
  const nav = useNavigate()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else if (timer === 0 && !canSendCode) {
      setCanSendCode(true)
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timer, canSendCode])

  const sendVerificationCode = () => {
    const email = watch('email')
    if (!email) {
      setError('email', { type: 'manual', message: '请输入邮箱地址' })
      return
    }
    if (canSendCode) {
      setCanSendCode(false)
      setTimer(120)
      getCodeReq(email).then(res => {
        successToast('验证码已发送，有效期为5分钟内')
      })
    }
  }

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: '两次密码输入不一致' })
      return
    }
    registerReq(data).then(res => {
      successToast('注册成功')
      nav('/login')
    })
  }

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
                注册你的账户
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
                <div className='flex items-center space-x-4'>
                  <div className='flex-1'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>验证码</label>
                    <Input
                      type='text'
                      {...register('code', { required: '验证码是必填项' })}
                      className='border border-slate-400'
                      placeholder='请输入验证码'
                    />
                    {errors.code && <span className='text-red-600'>{errors.code.message}</span>}
                  </div>
                  <Button type='button' onClick={sendVerificationCode} disabled={!canSendCode} className='h-10 mt-7'>
                    {canSendCode ? '发送验证码' : `请等待 ${timer}s 重试`}
                  </Button>
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>昵称</label>
                  <Input
                    type='text'
                    {...register('username', {
                      required: '昵称是必填项',
                      minLength: { value: 3, message: '昵称至少需要3个字符' }
                    })}
                    className='border border-slate-400'
                    placeholder='昵称'
                  />
                  {errors.username && <span className='text-red-600'>{errors.username.message}</span>}
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
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>确认密码</label>
                  <Input
                    type='password'
                    {...register('confirmPassword', {
                      required: '请再次输入密码',
                      validate: value => value === watch('password') || '两次密码输入不一致'
                    })}
                    className='border border-slate-400'
                    placeholder='••••••••'
                  />
                  {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword.message}</span>}
                </div>
                <Button type='submit' className='w-full'>
                  注册
                </Button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  已有账号?{' '}
                  <a
                    onClick={() => {
                      nav('/login')
                    }}
                    className='font-medium text-primary-600 hover:underline cursor-pointer dark:text-primary-500'
                  >
                    登录
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
