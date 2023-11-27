import RegisterFormVue from "../login/RegisterForm.vue";
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it} from "vitest"

let errorMessage: string
let errorMessageList: string[]

function register( email: string, password: string, captchaChecked: boolean){
    errorMessageList = []
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const passwordPattern = /^(?=.*[a-z])(?=.*[\d])(?=.*[^\d\w]).{5,}$/;

    if (!emailPattern.test(email)) {
      errorMessage = 'El mail no es correcte'
      errorMessageList.push(errorMessage)
      return false;
    }
    if (!passwordPattern.test(password)) {
      errorMessage = 'La contrasenya no es correcta'
      errorMessageList.push(errorMessage)
      return false;
    }

    if (captchaChecked){
      errorMessage = 'No has marcat la casella del reCAPTCHA'
      errorMessageList.push(errorMessage)
      return false;
    }

    if (
      emailPattern.test(email) &&
      passwordPattern.test(password) && captchaChecked
    ) {
      return true;
    }
  }

describe('Register', () => {
    it('Mail i contrasenya incorrectes, captcha sense marcar', () => {

        const resultado = register('hola', 'prueba', false);

        expect(resultado).toBe(false)

    })

    it('Mail i contrasenya incorrectes, captcha marcat', () => {

        const resultado = register('hola', 'prueba', true);

        expect(resultado).toBe(false)

    })

    it('Mail i contrasenya incorrectes, captcha marcat', () => {

        const resultado = register('hola', 'prueba', true);

        expect(resultado).toBe(false)

    })

    it('Mail i contrasenya correctes, captcha marcat', () => {

        const resultado = register('test@gmail.com', '12abc!!A', true);

        expect(resultado).toBe(true)

    })
})

