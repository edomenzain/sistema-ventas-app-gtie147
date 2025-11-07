import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({ providedIn : 'root'})
export class BaseForm {
    
    constructor() { }

    getErrorMessage(form: AbstractControl | null) {
        let message = '';

        if (form) {

            const messages: any = {
                required: 'Campo requerido',
                email: 'Formato inválido',
                pattern: 'Formato inválido',
                minError: 'El rango no es correcto',
                min: 'El rango no es correcto',
                max: 'El rango no es correcto',
                minlength: 'El rango no es correcto',
            }

            const { errors } = form;
            if (errors) {
                const errorKey = Object.keys(errors).find(Boolean);
                if (errorKey) message = messages[errorKey];
            }
        }

        return message;
    }

}