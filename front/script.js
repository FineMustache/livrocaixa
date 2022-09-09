function carregar() {
    let saldo = 0.0
    const tableDeb = document.getElementsByTagName("tbody")[0]
    const tableCre = document.getElementsByTagName("tbody")[1]
    let datas = []
    fetch("http://localhost:5000/livrocaixa/lancamentos")
    .then(res => { return res.json() })
    .then(lancamentos => {
        

        lancamentos.forEach(lancamento => {

            if (!datas.includes(lancamento.data.slice(0,10))) {
                datas.push(lancamento.data.slice(0,10))
            }

            let linha = document.querySelector(".modelo").cloneNode(true)

            linha.querySelector("#nLanc").innerHTML = lancamento.n_lancamento
            linha.querySelector("#data").innerHTML = lancamento.data.slice(0, 10)
            linha.querySelector("#desc").innerHTML = lancamento.descricao
            linha.querySelector("#valor").innerHTML = "R$ " + lancamento.valor
            if (lancamento.tipo == "C") {
                linha.querySelector("#tipo").innerHTML = "Entrada"
                tableCre.appendChild(linha)
            } else {
                linha.querySelector("#tipo").innerHTML = "Saída"
                tableDeb.appendChild(linha)
            }

            linha.classList.remove("modelo")

            saldo += parseFloat(lancamento.valor)
            console.log(saldo)
            document.getElementById("saldo").innerHTML = saldo
        });

        let optionTd = document.createElement("option")
            optionTd.value = "all"
            optionTd.innerHTML = "Todas"
            document.getElementById("datas").appendChild(optionTd)

        datas.forEach(data => {
            let option = document.createElement("option")
            option.value = data
            option.innerHTML = data
            document.getElementById("datas").appendChild(option)
        });
    })

}

function filtrar(data) {
    if (data == "all") {
        let modelo = document.querySelector(".modelo").cloneNode(true)

            tableDeb.innerHTML = ""
            tableDeb.appendChild(modelo)
            tableCre.innerHTML = ""
        carregar()
    } else {
        let saldo = 0.0
        const tableDeb = document.getElementsByTagName("tbody")[0]
        const tableCre = document.getElementsByTagName("tbody")[1]
        fetch("http://localhost:5000/livrocaixa/lancamentos")
        .then(res => { return res.json() })
        .then(lancamentos => {
            
            let modelo = document.querySelector(".modelo").cloneNode(true)

            tableDeb.innerHTML = ""
            tableDeb.appendChild(modelo)
            tableCre.innerHTML = ""

            lancamentos.forEach(lancamento => {

                if (lancamento.data.slice(0,10) == data) {
                    let linha = document.querySelector(".modelo").cloneNode(true)

                    linha.querySelector("#nLanc").innerHTML = lancamento.n_lancamento
                    linha.querySelector("#data").innerHTML = lancamento.data.slice(0, 10)
                    linha.querySelector("#desc").innerHTML = lancamento.descricao
                    linha.querySelector("#valor").innerHTML = "R$ " + lancamento.valor
                    if (lancamento.tipo == "C") {
                        linha.querySelector("#tipo").innerHTML = "Entrada"
                        tableCre.appendChild(linha)
                    } else {
                        linha.querySelector("#tipo").innerHTML = "Saída"
                        tableDeb.appendChild(linha)
                    }

                    linha.classList.remove("modelo")

                    saldo += parseFloat(lancamento.valor)
                    console.log(saldo)
                    document.getElementById("saldo").innerHTML = saldo
                }

                
            });
        })
    }
}

function cadastrar() {

    let lancamento = {
        "descricao": document.getElementById("inpDesc").value,
        "valor": document.getElementById("inpValor").value,
        "tipo": document.getElementById("inpTipo").value
    }

    fetch("http://localhost:5000/livrocaixa/lancamentos",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify(lancamento)
    })
    .then(res => { return res.json() })
    .then(resp => {
        if (resp.descricao !== undefined) {
            alert("Lançamento dadastrado com sucesso.")
            window.location.reload()
        }else{
            alert("Falha ao cadastrar")
        }
    })
}

function toggleModal() {
    document.querySelector(".screen-lock").classList.toggle("modelo")
    document.querySelector(".modal").classList.toggle("modelo")
}