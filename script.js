const inputCep = document.querySelector("#cep")
const btnBuscar = document.querySelector("#btn-buscar")

// endereços
const inputEstado = document.querySelector("#estado")
const inputCidade = document.querySelector("#cidade")
const inputBairro = document.querySelector("#bairro")
const inputLogradouro = document.querySelector("#logradouro")
const inputNumero = document.querySelector("#numero")
const inputComplemento = document.querySelector("#complemento")

async function preencherForm() {
    inputEstado.value = ""
    inputCidade.value = ""
    inputBairro.value = ""
    inputLogradouro.value = ""
    inputComplemento.value = ""
    inputNumero.value = ""
    
    let valueInputCep = inputCep.value
    try {
        let response = await fetch(`https://viacep.com.br/ws/${valueInputCep}/json`)
        let data = await response.json()
        
        if (data.erro == "true") {
            inputNumero.setAttribute("disabled", "")
            inputComplemento.setAttribute("disabled", "")
            alert("CEP Inválido")
            return;
        }

        inputEstado.value = data.estado
        inputCidade.value = data.localidade
        inputBairro.value = data.bairro
        inputLogradouro.value = data.logradouro

        inputNumero.removeAttribute("disabled")
        inputComplemento.removeAttribute("disabled")
    } catch (error) {
        inputNumero.setAttribute("disabled", "")
        inputComplemento.setAttribute("disabled", "")
        alert("CEP Inválido")
    }
}

btnBuscar.addEventListener('click', preencherForm)

function mask() {
    let valueInputCep = inputCep.value
    if (valueInputCep.length == 5) {
        inputCep.value += "-"
    }
}

inputCep.addEventListener('keypress', mask)