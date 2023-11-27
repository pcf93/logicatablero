import { shallowMount } from '@vue/test-utils'
import { describe, expect, it} from "vitest"
import RegisterForm from '@/components/login/RegisterForm.vue'

  const wrapper = shallowMount(RegisterForm)

describe('Register', () => {
    it('Mail i contrasenya incorrectes, captcha sense marcar', () => {

        const resultado = wrapper.vm.register('hola', 'prueba', false);

        expect(resultado).toBe(false)

    })

    it('Mail i contrasenya incorrectes, captcha marcat', () => {

        const resultado = wrapper.vm.register('hola', 'prueba', true);

        expect(resultado).toBe(false)

    })

    it('Mail i contrasenya incorrectes, captcha marcat', () => {

        const resultado = wrapper.vm.register('hola', 'prueba', true);

        expect(resultado).toBe(false)

    })

    it('Mail i contrasenya correctes, captcha marcat', () => {

        const resultado = wrapper.vm.register('test@gmail.com', '12abc!!A', true);

        expect(resultado).toBe(true)

    })

    it('Mail i contrasenya correctes, captcha sense marcar', () => {

        const resultado = wrapper.vm.register('test@gmail.com', '12abc!!A', false);

        expect(resultado).toBe(false)

    })

    it('Mail correcte i contrasenya incorrecte, captcha marcat', () => {

        const resultado = wrapper.vm.register('test@gmail.com', '1234', true);

        expect(resultado).toBe(false)

    })

    it('Mail incorrecte i contrasenya correcte, captcha marcat', () => {

        const resultado = wrapper.vm.register('testgmail.com', '12abc!!A', true);

        expect(resultado).toBe(false)

    })
})

