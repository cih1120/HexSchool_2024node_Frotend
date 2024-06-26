'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { ApiError } from 'next/dist/server/api-utils'
import toast from 'react-hot-toast'
import { ISignUpReq } from '@/service/types'
import Input from '@/components/Form/FormComponents/Input'
import RadioGroup from '@/components/Form/FormComponents/RadioGroup'
import { signUp } from '@/service/auth.service'
import AuthFormLayout, { setErrorMessage } from '../AuthForm'
import MainButton from '@/components/Form/FormComponents/MainButton'

export default function SignUpForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        control,
        watch,
        setError,
        formState: { errors },
    } = useForm<ISignUpReq>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            gender: 'male',
        },
    })

    const errorConfig = {
        406: {
            fieldName: 'email',
            type: 'emailNotFound',
            message: 'Email 已被註冊過',
        },
    }

    const onSubmit: SubmitHandler<ISignUpReq> = async (data) => {
        try {
            setIsLoading(true)
            await signUp(data)
            toast.success('註冊成功🎉請重新登入！')
            setTimeout(() => {
                router.push('/auth/login')
            }, 1000)
        } catch (err) {
            const error = err as ApiError
            const statusCode = error.statusCode
                ? error.statusCode.toString()
                : '500'
            setErrorMessage(errorConfig, setError, statusCode)
            setIsLoading(false)
        }
    }

    const genderRadioGroup = [
        { label: '生理男', value: 'male' },
        { label: '生理女', value: 'female' },
    ]

    return (
        <AuthFormLayout onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input
                        value={field.value}
                        setValue={field.onChange}
                        type="text"
                        label="暱稱"
                        isInvalid={!!errors.name}
                        errorMessage={errors.name && errors.name?.message}
                        {...register('name', {
                            required: '請填寫暱稱',
                            minLength: {
                                value: 2,
                                message: '暱稱至少 2 個字元以上',
                            },
                        })}
                    />
                )}
            />

            <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        radioArray={genderRadioGroup}
                        value={field.value}
                        setValue={field.onChange}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        value={field.value}
                        setValue={field.onChange}
                        type="email"
                        label="Email"
                        autoComplete="email"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email && errors.email?.message}
                        {...register('email', {
                            required: '請填寫email',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'email 格式錯誤',
                            },
                        })}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input
                        value={field.value}
                        setValue={field.onChange}
                        type="password"
                        label="密碼"
                        isInvalid={!!errors.password}
                        errorMessage={
                            errors.password && errors.password?.message
                        }
                        {...register('password', {
                            required: '請填寫密碼',
                            minLength: {
                                value: 8,
                                message: '密碼長度最小為8碼',
                            },
                        })}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <Input
                        value={field.value}
                        setValue={field.onChange}
                        type="password"
                        label="確認密碼"
                        isInvalid={!!errors.password}
                        errorMessage={
                            errors.confirmPassword &&
                            errors.confirmPassword?.message
                        }
                        {...register('confirmPassword', {
                            required: '請再次填寫密碼',
                            minLength: {
                                value: 8,
                                message: '密碼長度最小為8碼',
                            },
                            validate: (val: string) => {
                                if (watch('password') != val) {
                                    return '密碼與確認密碼不符合！'
                                }
                            },
                        })}
                    />
                )}
            />
            <div className="w-full space-y-2">
                <MainButton
                    isLoading={isLoading}
                    solid="strong"
                    buttonType="submit"
                >
                    註冊
                </MainButton>

                <Link
                    href="/auth/login"
                    className="group relative m-6 mx-auto block w-max pb-1 text-sm"
                >
                    <span className="relative z-10 px-2 group-hover:text-gray-dark">
                        登入
                    </span>
                    <span className="absolute bottom-0 left-0 z-0 h-0.5 w-full bg-accent transition-all group-hover:h-full "></span>
                </Link>
            </div>
        </AuthFormLayout>
    )
}
