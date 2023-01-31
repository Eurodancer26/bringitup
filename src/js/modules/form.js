export default class Form {
    constructor(forms, inputs, message, path)
     {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll(inputs);
        this.message = message;
        this.path = path;
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs () {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });   
    }

    initMask() {
        let setCursorPosition =(position, element) => {
            element.focus();
    
            if (element.setSelectionRange) {
                element.setSelectionRange(position, position, 'forward');
            } else if (element.createTextRange) {
                let range = element.value.createTextRange();
    
                range.collapse(false);
                range.selectionStart('character', position);
                range.selectionEnd('character', position);
                range.selectionDirection('forward');
                range.select();
            }
        };
    
        function createMask(event) {
    
            let matrix = '+1 (___) ___ - ____',
                i = 0,
                def = matrix.replace(/\D/g, ''), //статичное, работает на основе матрицы
                val = this.value.replace(/\D/g, '');//динамичное
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, (a) => {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
            console.log(this.value.length);
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        console.log(url);
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 2000);
                    });
            });
        });
    }
}