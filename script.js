const resultado = document.querySelector(".resultados");
const formulario = document.querySelector("form")

const exibirResultados = (event) => {
    event.preventDefault();

    const tituloResultado = document.querySelector("#tituloResultado")
    tituloResultado.style.display = "block";

    const nome = document.querySelector('input[name=nome]').value
    const email = document.querySelector('input[name=email]').value
    const idade = document.querySelector('input[name=idade]').value
    const telefone = document.querySelector('input[name=telefone]').value
    const endereco = document.querySelector('input[name=endereco]').value
    const sono = document.querySelector('input[name=sono]').value
    const alimentacaoManha = document.querySelector('input[name=alimentacao_manha]').value
    const alimentacaoAlmoco = document.querySelector('input[name=alimentacao_almoco]').value
    const alimentacaoJantar = document.querySelector('input[name=alimentacao_jantar]').value
    const agua = document.querySelector('input[name=agua]').value
    var opcoesObjetivos = document.getElementsByName("opcoes_objetivos");

    var opcaoSelecionada = "";

    for (var i = 0; i < opcoesObjetivos.length; i++) {
        if (opcoesObjetivos[i].checked) {
            opcaoSelecionada = opcoesObjetivos[i].value;
            break; 
        }
    }
    const objetivo = opcaoSelecionada;
    


    const imc = calcularIMC().toFixed(2);
    const rcq = calcularRCQ().toFixed(2);
    const rce = calcularRCE().toFixed(2);
    const iac = calcularIAC().toFixed(2);
    const percentual = calcularPercentualDeGordura().toFixed(2);
    const cooper = calcularCooper();
    const flexao = calcularFlexao();
    const abdominal = calcularAbdominal();
    const salto = calcularSalto();
    const agilidade = calcularAgilidade();
    const flexibilidade = calcularFlexibilidade();

    fetch('https://api.sheetmonkey.io/form/pyh8YALMzSJd2AyjpxN7yJ', {
        method: 'post',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ Nome: nome, Email: email, Idade: idade, Telefone: telefone, Endereco: endereco, Sono: sono, AlimentacaoManha: alimentacaoManha, Almoco: alimentacaoAlmoco, Jantar: alimentacaoJantar, Objetivo: objetivo, Agua: agua, IMC: imc, RCQ: rcq, RCE: rce, IAC: iac, Percentual: percentual, Cooper: cooper, Flexao: flexao, Abdominal: abdominal, Salto: salto, Agilidade: agilidade, Flexibilidade: flexibilidade})
    })
}






formulario.addEventListener("submit", exibirResultados)




function calcularIMC(){
    var peso = parseFloat(document.querySelector("#inputPeso").value)
    var altura = parseFloat(document.querySelector("#inputEstatura").value)

    let imc = peso/(altura*altura)

    if(imc < 17.0){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Muito Abaixo do Ideal</p> `
    }else if(imc > 17.0 && imc <= 18.49){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Abaixo do Ideal</p>`
    }else if(imc >= 18.5 && imc <= 24.99){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Ideal</p>`
    }else if(imc >= 25 && imc <= 29.99){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Sobrepeso</p>`
    }else if(imc >= 30.0 && imc <= 34.99){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Obesidade Classe I</p>`
    }else if(imc >= 35.0 && imc <= 39.99){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Obesidade Classe II</p>`
    }else if(imc >= 40){
        resultado.innerHTML += `<li class="resultados__item mt-3">IMC: ${imc.toFixed(2)}          Situação: Obesidade Classe III</p>`
    }
    return imc;
}
function calcularIAC(){
    var altura = parseFloat(document.querySelector("#inputEstatura").value)
    var quadril = parseFloat(document.querySelector("#inputQuadril").value)
    
    let iac = ((quadril)/(altura*Math.sqrt(altura)))-18
    if(iac < 18.5){
        resultado.innerHTML += `<li class="resultados__item mt-3">IAC: ${iac.toFixed(2)}      Situação: Abaixo do ideal`
    }else if(iac >= 18.5 && iac <= 25.0){
        resultado.innerHTML += `<li class="resultados__item mt-3">IAC: ${iac.toFixed(2)}      Situação: Ideal`

    }
    else if(iac > 25.0 && iac <= 30.0){
        resultado.innerHTML += `<li class="resultados__item mt-3">IAC: ${iac.toFixed(2)}      Situação: Sobrepeso`
    }else if(iac > 30.0){
        resultado.innerHTML += `<li class="resultados__item mt-3">IAC: ${iac.toFixed(2)}      Situação: Obesidade`
    }
    return iac;
}
function calcularPercentualDeGordura(){
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var resultadoElemento = document.getElementById("resultado");
   
      
    if (femininoRadio.checked) {
        subescapular = parseFloat(document.querySelector("#inputSubescapular").value)
        supraFem = parseFloat(document.querySelector("#inputSupra_iliaca_fem").value)
        coxa = parseFloat(document.querySelector("#inputCoxa").value)

        let densidade = 1.16650 - 0.07063*Math.log10(coxa+subescapular+supraFem)
        var percentual = ((4.95/densidade)-4.5)*100 
        resultado.innerHTML += `<li class="resultados__item mt-3">Percentual de gordura: ${percentual.toFixed(2)}% `

    }else if (masculinoRadio.checked) {
        triceps = parseFloat(document.querySelector("#inputTriceps").value)
        supra = parseFloat(document.querySelector("#inputSupra_iliaca").value)
        abdominal = parseFloat(document.querySelector("#inputDobra_abdominal").value)
        
        let densidade = 1.17136-0.06706*Math.log10(triceps+supra+abdominal);
        var percentual = ((4.95/densidade)-4.5)*100 
        resultado.innerHTML += `<li class="resultados__item mt-3">Percentual de gordura: ${percentual.toFixed(2)}% `
    }else {
        resultadoElemento.textContent = "Selecione uma opção de sexo.";
      }
    return percentual;
}
function calcularCooper() {
    var dist_perc = parseFloat(document.querySelector("#inputCooper").value)
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var idade = parseFloat(document.querySelector("#inputIdade").value)

    if (masculinoRadio.checked) {
        if (idade < 13) {
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Não há classificação para idades menores de 13 anos`
        } else if (idade >= 13 && idade <= 19) {
            if (dist_perc < 2090) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 2090 && dist_perc <= 2209) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 2210 && dist_perc <= 2519) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 2520 && dist_perc <= 2779) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2780 && dist_perc <= 3000) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 3000) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 20 && idade <= 29) {
            if (dist_perc < 1960) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1960 && dist_perc <= 2119) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 2120 && dist_perc <= 2409) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 2410 && dist_perc <= 2649) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2650 && dist_perc <= 2830) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2830) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 30 && idade <= 39) {
            if (dist_perc < 1900) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1900 && dist_perc <= 2099) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 2100 && dist_perc <= 2409) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 2410 && dist_perc <= 2519) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2520 && dist_perc <= 2720) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2720) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 40 && idade <= 49) {
            if (dist_perc < 1830) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1830 && dist_perc <= 1999) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 2000 && dist_perc <= 2249) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 2250 && dist_perc <= 2469) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2470 && dist_perc <= 2660) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2660) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 50 && idade <= 59) {
            if (dist_perc < 1660) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1660 && dist_perc <= 1879) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1880 && dist_perc <= 2099) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 2100 && dist_perc <= 2329) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2330 && dist_perc <= 2540) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2540) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 60) {
            if (dist_perc < 1400) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1400 && dist_perc <= 1649) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1650 && dist_perc <= 1939) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 1940 && dist_perc <= 2129) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2130 && dist_perc <= 2490) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2490) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        }
    } else if (femininoRadio.checked) {
        if (idade < 13) {
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Não há classificação para idades menores de 13 anos`
        } else if (idade >= 13 && idade <= 19) {
            if (dist_perc < 1610) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1610 && dist_perc <= 1909) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1910 && dist_perc <= 2089) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 2090 && dist_perc <= 2309) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2310 && dist_perc <= 2430) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2430) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 20 && idade <= 29) {
            if (dist_perc < 1550) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1550 && dist_perc <= 1799) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1780 && dist_perc <= 1979) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 1980 && dist_perc <= 2169) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2170 && dist_perc <= 2330) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2330) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 30 && idade <= 39) {
            if (dist_perc < 1510) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1510 && dist_perc <= 1699) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1700 && dist_perc <= 1969) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 1970 && dist_perc <= 2089) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2090 && dist_perc <= 2240) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2240) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 40 && idade <= 49) {
            if (dist_perc < 1420) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1420 && dist_perc <= 1589) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1590 && dist_perc <= 1799) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 1800 && dist_perc <= 2009) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 2010 && dist_perc <= 2160) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2160) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 50 && idade <= 59) {
            if (dist_perc < 1350) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1350 && dist_perc <= 1509) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1510 && dist_perc <= 1699) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 1700 && dist_perc <= 1909) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 1910 && dist_perc <= 2090) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 2090) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        } else if (idade >= 60) {
            if (dist_perc < 1260) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica muito fraca`
            } else if (dist_perc >= 1260 && dist_perc <= 1399) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica fraca`
            } else if (dist_perc >= 1400 && dist_perc <= 1599) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica média`
            } else if (dist_perc >= 1600 && dist_perc <= 1759) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica boa`
            } else if (dist_perc >= 1760 && dist_perc <= 1900) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica excelente`
            } else if (dist_perc > 1900) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de Cooper: ${dist_perc.toFixed(2)} m       Situação: Capacidade aeróbica superior`
            }
        }
    }
    return dist_perc;
}



function calcularRCQ() {
    var circn_cintura = parseFloat(document.querySelector("#inputCintura").value)
    var circn_quadril = parseFloat(document.querySelector("#inputQuadril").value)
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var idade = parseFloat(document.querySelector("#inputIdade").value)
    var rcq = circn_cintura / circn_quadril

    if (masculinoRadio.checked) {
        if (idade <= 29) {
            if (rcq < 0.83) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.83 && rcq <= 0.88) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.89 && rcq <= 0.94) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.94) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade >= 30 && idade <= 39) {
            if (rcq < 0.84) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.84 && rcq <= 0.91) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.92 && rcq <= 0.96) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.96) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade >= 40 && idade <= 49) {
            if (rcq < 0.88) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.88 && rcq <= 0.95) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.96 && rcq <= 1.00) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 1.00) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade >= 50 && idade <= 59) {
            if (rcq < 0.90) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.90 && rcq <= 0.96) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.97 && rcq <= 1.02) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 1.02) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade > 59) {
            if (rcq < 0.91) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.91 && rcq <= 0.98) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.99 && rcq <= 1.03) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 1.03) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        }
    } else if (femininoRadio.checked) {
        if (idade <= 29) {
            if (rcq < 0.71) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.71 && rcq <= 0.77) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.78 && rcq <= 0.82) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.82) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade >= 30 && idade <= 39) {
            if (rcq < 0.72) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.72 && rcq <= 0.78) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.79 && rcq <= 0.84) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.84) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade >= 40 && idade <= 49) {
            if (rcq < 0.73) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.73 && rcq <= 0.79) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.80 && rcq <= 0.87) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.87) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade >= 50 && idade <= 59) {
            if (rcq < 0.74) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.74 && rcq <= 0.81) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.82 && rcq <= 0.88) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.88) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        } else if (idade > 59) {
            if (rcq < 0.76) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Baixo risco de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.76 && rcq <= 0.83) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco moderado de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq >= 0.84 && rcq <= 0.90) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco alto de desenvolver ou agravar doenças cardiovasculares`
            } else if (rcq > 0.90) {
                resultado.innerHTML += `<li class="resultados__item mt-3">RCQ: ${rcq.toFixed(2)}        Situação: Risco muito alto de desenvolver ou agravar doenças cardiovasculares`
            }
        }
    }
    return rcq;
}
function calcularAbdominal() {
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var idade = parseFloat(document.querySelector("#inputIdade").value)
    var repeticoes = parseInt(document.querySelector("#inputAbdominais").value)

    if (masculinoRadio.checked) {
        if (idade < 15) {
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular não avaliada para esta faixa etária`
        } else if (idade >= 15 && idade <= 19) {
            if (repeticoes >= 48) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 42 && repeticoes <= 47) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 38 && repeticoes <= 41) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 33 && repeticoes <= 37) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 32) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 20 && idade <= 29) {
            if (repeticoes >= 43) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 37 && repeticoes <= 42) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 33 && repeticoes <= 36) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 29 && repeticoes <= 32) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 28) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 30 && idade <= 39) {
            if (repeticoes >= 36) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 31 && repeticoes <= 35) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 27 && repeticoes <= 30) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 22 && repeticoes <= 26) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 21) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 40 && idade <= 49) {
            if (repeticoes >= 31) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 26 && repeticoes <= 30) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 22 && repeticoes <= 25) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 17 && repeticoes <= 21) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 16) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 50 && idade <= 59) {
            if (repeticoes >= 26) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 22 && repeticoes <= 25) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 18 && repeticoes <= 21) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 13 && repeticoes <= 17) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 12) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 60 && idade <= 69) {
            if (repeticoes >= 23) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 17 && repeticoes <= 22) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 12 && repeticoes <= 16) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 7 && repeticoes <= 11) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 6) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 70) {
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular não avaliada para esta faiza estária`
        }
    } else if (femininoRadio.checked) {
        if (idade < 15) {
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular não avaliada para esta faixa etária`
        } else if (idade >= 15 && idade <= 19) {
            if (repeticoes >= 42) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 36 && repeticoes <= 41) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 32 && repeticoes <= 35) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 27 && repeticoes <= 31) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 26) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 20 && idade <= 29) {
            if (repeticoes >= 36) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 31 && repeticoes <= 35) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 25 && repeticoes <= 30) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 21 && repeticoes <= 24) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 20) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 30 && idade <= 39) {
            if (repeticoes >= 29) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 24 && repeticoes <= 28) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 20 && repeticoes <= 23) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 15 && repeticoes <= 19) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 14) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 40 && idade <= 49) {
            if (repeticoes >= 25) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 20 && repeticoes <= 24) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 15 && repeticoes <= 19) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 7 && repeticoes <= 14) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 6) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 50 && idade <= 59) {
            if (repeticoes >= 19) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 12 && repeticoes <= 18) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 5 && repeticoes <= 11) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 3 && repeticoes <= 4) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 2) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 60 && idade <= 69) {
            if (repeticoes >= 16) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular excelente`
            } else if (repeticoes >= 12 && repeticoes <= 15) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular acima da média`
            } else if (repeticoes >= 4 && repeticoes <= 11) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular média`
            } else if (repeticoes >= 2 && repeticoes <= 3) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular abaixo da média`
            } else if (repeticoes <= 1) {
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular muito abaixo da média`
            }
        } else if (idade >= 70) {
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste abdominal: ${repeticoes}        Situação: Resistência muscular não avaliada para esta faixa etária`
        }
    }
    return repeticoes;
}
function calcularFlexao(){
    var flexaoBraco = parseInt(document.getElementById("inputFlexao").value);
    var idade = parseInt(document.getElementById("inputIdade").value);
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");

    if(masculinoRadio.checked){
        if(idade < 15){
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco} Situação: Resistência de membros superiores não avaliada`
        }
        else if(idade >= 15 && idade <= 19){
            if(flexaoBraco >= 39){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 38 && flexaoBraco >= 29){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 28 && flexaoBraco >= 23){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 22 && flexaoBraco >= 18){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
        else if(idade >= 20 && idade <= 29){
            if(flexaoBraco >= 36){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 35 && flexaoBraco >= 29){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 28 && flexaoBraco >= 22){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 21 && flexaoBraco >= 17){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
        else if(idade >= 30 && idade <= 39){
            if(flexaoBraco >= 30){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 29 && flexaoBraco >= 22){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 21 && flexaoBraco >= 17){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 16 && flexaoBraco >= 12){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
        else if(idade >= 40 && idade <= 49){
            if(flexaoBraco >= 22){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 21 && flexaoBraco >= 17){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 16 && flexaoBraco >= 13){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 12 && flexaoBraco >= 10){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }else if(idade >= 50 && idade <= 59){
            if(flexaoBraco >= 21){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 20 && flexaoBraco >= 13){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 12 && flexaoBraco >= 10){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 9 && flexaoBraco >= 7){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }else if(idade >= 60 && idade <= 69){
            if(flexaoBraco >= 18){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 17 && flexaoBraco >= 11){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 10 && flexaoBraco >= 8){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 7 && flexaoBraco >= 5){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
    }else if(femininoRadio.checked){
        if(idade < 15){
            resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco} Situação: Resistência de membros superiores não avaliada`
        }
        else if(idade >= 15 && idade <= 19){
            if(flexaoBraco >= 33){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 32 && flexaoBraco >= 25){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 24 && flexaoBraco >= 18){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 17 && flexaoBraco >= 12){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
        else if(idade >= 20 && idade <= 29){
            if(flexaoBraco >= 30){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 29 && flexaoBraco >= 21){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 20 && flexaoBraco >= 15){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 14 && flexaoBraco >= 10){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
        else if(idade >= 30 && idade <= 39){
            if(flexaoBraco >= 27){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 26 && flexaoBraco >= 20){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 19 && flexaoBraco >= 13){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 12 && flexaoBraco >= 8){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
        else if(idade >= 40 && idade <= 49){
            if(flexaoBraco >= 24){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 23 && flexaoBraco >= 15){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 14 && flexaoBraco >= 11){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 10 && flexaoBraco >= 5){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }else if(idade >= 50 && idade <= 59){
            if(flexaoBraco >= 21){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 20 && flexaoBraco >= 11){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 10 && flexaoBraco >= 7){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 6 && flexaoBraco >= 2){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }else if(idade >= 60 && idade <= 69){
            if(flexaoBraco >= 17){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Excelente`
            }else if(flexaoBraco <= 16 && flexaoBraco >= 12){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Acima da Média`
            }else if(flexaoBraco <= 11 && flexaoBraco >= 5){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Média`
            }else if(flexaoBraco <= 4 && flexaoBraco >= 2){
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Abaixo da Média`
            }else{
                resultado.innerHTML += `<li class="resultados__item mt-3">Teste de flexão de braço: ${flexaoBraco}      Situação: Resistência de membros superiores Ruim`
            }
        }
    }
    return flexaoBraco;
}
function calcularRCE(){
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var circunferencia = parseFloat(document.getElementById("inputCintura").value);
    var estatura = parseFloat(document.getElementById("inputEstatura").value)*100;
    var rce = circunferencia/estatura
    if(masculinoRadio.checked){
        if(rce > 0.52){
            resultado.innerHTML += `<li class="resultados__item mt-3">RCE: ${rce.toFixed(2)}      Situação: Acima do ponto de corte.`
        }else{
            resultado.innerHTML += `<li class="resultados__item mt-3">RCE: ${rce.toFixed(2)}      Situação: Está no ponte de corte.`
        }
    }else if(femininoRadio.checked){
        if(rce > 0.53){
            resultado.innerHTML += `<li class="resultados__item mt-3">RCE: ${rce.toFixed(2)}      Situação: Acima do ponto de corte.`
        }else{
            resultado.innerHTML += `<li class="resultados__item mt-3">RCE: ${rce.toFixed(2)}      Situação: Está no ponte de corte.`
        }
    }
    return rce;
}

function calcularFlexibilidade(){
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var flexibilidade = parseFloat(document.getElementById("inputFlexibilidade").value);

    if (masculinoRadio.checked) {
        if(flexibilidade < 25){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Muito Fraco`
        }else if (flexibilidade >= 25 && flexibilidade <= 29){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Fraco`
        }else if(flexibilidade >= 30 && flexibilidade <= 34){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Razoável`
        } else if(flexibilidade >= 35 && flexibilidade <= 39){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Bom`
        }else if(flexibilidade >= 40 && flexibilidade <= 49){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Muito Bom`
        }else if(flexibilidade >= 50){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Excelente`
        }
    }else if(femininoRadio.checked){
        if(flexibilidade < 26){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Muito Fraco`
        }else if (flexibilidade >= 26 && flexibilidade <= 30){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Fraco`
        }else if(flexibilidade >= 31 && flexibilidade <= 36){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Razoável`
        } else if(flexibilidade >= 37 && flexibilidade <= 42){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Bom`
        }else if(flexibilidade >= 43 && flexibilidade <= 49){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Muito Bom`
        }else if(flexibilidade >= 50){
            resultado.innerHTML += `<li class="resultados__item mt-3">Flexibilidade: ${flexibilidade}      Situação: Excelente`
        }
    }
    return flexibilidade;

}function calcularAgilidade(){
    var femininoRadio = document.getElementById("sexoFeminino");
    var masculinoRadio = document.getElementById("sexoMasculino");
    var agilidade = parseFloat(document.getElementById("inputAgilidade").value);

    if(masculinoRadio.checked){
        if(agilidade <= 4.91){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Excelente`
        }else if(agilidade >= 4.92 && agilidade <= 5.59){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Muito Bom`
        }else if(agilidade >= 5.60 && agilidade <= 5.99){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Bom`
        }else if(agilidade >= 6.00 && agilidade <= 6.26){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Razoável`
        }else if(agilidade > 6.26){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Fraco`
        }
    }else if(femininoRadio.checked){
        if(agilidade <= 5.33){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Excelente`
        }else if(agilidade >= 5.34 && agilidade <= 6.19){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Muito Bom`
        }else if(agilidade >= 6.20 && agilidade <= 6.66){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Bom`
        }else if(agilidade >= 6.67 && agilidade <= 7.00){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Razoável`
        }else if(agilidade > 7.00){
            resultado.innerHTML += `<li class="resultados__item mt-3">Agilidade: ${agilidade}      Situação: Fraco`
        }
    }
    return agilidade;
}function calcularSalto(){
    var saltoHorizontal = parseInt(document.getElementById('inputSalto_horizontal').value);
    if(saltoHorizontal < 159){
        resultado.innerHTML += `<li class="resultados__item mt-3">Teste de força explosiva MMI: ${saltoHorizontal}      Situação: Fraco`
    }else if(saltoHorizontal >= 159 && saltoHorizontal <= 169){
        resultado.innerHTML += `<li class="resultados__item mt-3">Teste de força explosiva MMI: ${saltoHorizontal}      Situação: Razoável`
    }else if(saltoHorizontal >= 170 && saltoHorizontal <= 184){
        resultado.innerHTML += `<li class="resultados__item mt-3">Teste de força explosiva MMI: ${saltoHorizontal}      Situação: Bom`

    }else if(saltoHorizontal >= 185 && saltoHorizontal <= 216){
        resultado.innerHTML += `<li class="resultados__item mt-3">Teste de força explosiva MMI: ${saltoHorizontal}      Situação: Muito Bom`

    }else if(saltoHorizontal > 216){
        resultado.innerHTML += `<li class="resultados__item mt-3">Teste de força explosiva MMI: ${saltoHorizontal}      Situação: Excelente`
    }
    return saltoHorizontal;
}
