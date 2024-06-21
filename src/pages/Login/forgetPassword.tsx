import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import logo from '@/assets/svg/logo.svg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

type FormValues = {
  email: string
  code: string
  newPassword: string
  confirmNewPassword: string
}

export default function ResetPassword() {
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
    } else if (timer === 0 && interval) {
      setCanSendCode(true)
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timer])

  const sendVerificationCode = () => {
    if (canSendCode) {
      setCanSendCode(false)
      setTimer(300) // 300秒 = 5分钟
      // 在这里调用发送验证码的API
      console.log('发送验证码到邮箱')
    }
  }

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (data.newPassword !== data.confirmNewPassword) {
      setError('confirmNewPassword', { type: 'manual', message: '两次密码输入不一致' })
      return
    }
    console.log(data)
    // 这里可以处理表单提交，例如发送请求到服务器重设密码
  }

  return (
    <div>
      <section className='fixed w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a href='#' className='flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white'>
            <img className='w-8 h-8 mr-2' src={logo} alt='logo' />
            QuickMemo
          </a>
          <div className='max-w-[1000px] w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                重设密码
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
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>验证码</label>
                  <div className='flex items-center space-x-4'>
                    <Input
                      type='text'
                      {...register('code', { required: '验证码是必填项' })}
                      className='border border-slate-400'
                      placeholder='请输入验证码'
                    />
                    <Button type='button' onClick={sendVerificationCode} disabled={!canSendCode} className='h-10'>
                      {canSendCode ? '发送验证码' : `请等待 ${timer} 秒`}
                    </Button>
                  </div>
                  {errors.code && <span className='text-red-600'>{errors.code.message}</span>}
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>新密码</label>
                  <Input
                    type='password'
                    {...register('newPassword', {
                      required: '新密码是必填项',
                      minLength: { value: 8, message: '密码至少需要8个字符' }
                    })}
                    className='border border-slate-400'
                    placeholder='••••••••'
                  />
                  {errors.newPassword && <span className='text-red-600'>{errors.newPassword.message}</span>}
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>确认新密码</label>
                  <Input
                    type='password'
                    {...register('confirmNewPassword', {
                      required: '请再次输入新密码',
                      validate: value => value === watch('newPassword') || '两次密码输入不一致'
                    })}
                    className='border border-slate-400'
                    placeholder='••••••••'
                  />
                  {errors.confirmNewPassword && (
                    <span className='text-red-600'>{errors.confirmNewPassword.message}</span>
                  )}
                </div>
                <Button type='submit' className='w-full'>
                  重设密码
                </Button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  记得密码了?{' '}
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
