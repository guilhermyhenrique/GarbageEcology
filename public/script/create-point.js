function populateUFs() {

    const ufSelect = document.querySelector("select[name=uf")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")

    const ufvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>>`
            }

            citySelect.disabled = false

        })
}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)


// Itens de coleta
// Pegar todos os (li,s)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectesItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectesItem(event) {

    const itemLi = event.target

    //Adicionar ou remover uma classe com javaScript

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log(`ITEM ID: `, itemId)

    // verificar se existe itens selecionados, se sim
    // pegar os itens selecionados 

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso sera verdadeiro ou falso 
        return itemFound
    })

    // se ja estiver selecionado tirar da seleção

    if (alreadySelected >= 0) {

        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId // falso
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {
        // se não estiver selecionado
        // add a seleçao
        selectedItems.push(itemId)
    }


    console.log(`selectedItems: `, selectedItems)


    // atualizar o campo escondido com os itens atualizados

    collectedItems.value = selectedItems

}