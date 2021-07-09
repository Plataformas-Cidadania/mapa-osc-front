function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}


function formatNumber(n, c, d, t){

    let multiplo = 1;
    for(let i=0; i<c; i++){
        multiplo*=10;
    }

    //console.log(multiplo);
    //console.log(parseFloat(n));
    //console.log(Math.round(n*multiplo)/multiplo);

    var n = Math.round(n*multiplo)/multiplo,
    c = isNaN(c = Math.round(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

    //console.log(formatNumber(999999999999.165, 0, ',', '.'));
}

function downloadImage(element, btn, arquivo) {
    //$("#btn-Convert-Html2Image").on('click', function () {
    console.log(element, btn, arquivo);
    html2canvas(element, {
        onrendered: function (canvas) {
            //$("#previewImage").append(canvas);

            var imageData = canvas.toDataURL("image/png");
            var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");

            //$("#btn-Convert-Html2Image").attr("download", "nome_arquivo.png").attr("href", newData);
            $("#"+btn).attr("download", arquivo).attr("href", newData);

            //$('#divhidden').html('<img src="'+newData+'" alt="">');
            //print('divhidden');

        }
    });
}


function printCanvas(canvasId){
    let tela_impressao = window.open('');
    tela_impressao.document.open();
    tela_impressao.document.write("<br><img src='"+document.getElementById(canvasId).toDataURL()+"'/>");
    tela_impressao.document.close();
    tela_impressao.focus();
    tela_impressao.print();
    tela_impressao.close();
}


function downloadCanvas(linkId, canvasId, filename) {
    let link = document.getElementById(linkId);
    /*console.log(link);
    console.log(canvasId);
    console.log(filename);*/
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

function validateCpf(strCPF) {
    if(!strCPF){
        return false;
    }

    strCPF = strCPF.replace(/[^0-9]/g,'');

    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}



function cleanReplace(str) {

    str = str.replace( /[.]/g, '' );

    str = str.replace( /\s/g, '-' );

    str = str.replace( /[áàâãä]/g, 'a' );
    str = str.replace( /[éèê]/g, 'e' );
    str = str.replace( /[íì]/g, 'i' );
    str = str.replace( /[óòôõö]/g, 'o' );
    str = str.replace( /[úùü]/g, 'u' );
    str = str.replace( /[ç]/g, 'c' );

    str = str.replace( /[%]/g, '' );
    str = str.replace( /[,]/g, '-' );
    str = str.replace( /[/]/g, '-' );

    str = str.toLowerCase();

    return str;
}

function maskCep(cep) {
    cep = cep.replace(/\D/g,"");
    cep = cep.replace(/^(\d{5})(\d)/g,"$1-$2");
    return cep;
}
function maskCpf(cpf) {
    cpf = cpf.replace(/\D/g,"");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

    return cpf;
}
function maskCel(cel) {

    cel = cel.replace(/\D/g,"")
    cel = cel.replace(/(\d\d)(\d)/,"($1) $2");
    cel = cel.replace(/(\d)(\d{8})/,"$1-$2");
    cel = cel.replace(/(\d{4})(\d)/,"$1-$2");

    return cel;
}
function maskCnpj(cnpj) {

    cnpj = cnpj.replace(/\D/g,"");
    cnpj = cnpj.replace(/(\d{2})(\d)/,"$1.$2");
    cnpj = cnpj.replace(/(\d{3})(\d)/,"$1.$2");
    cnpj = cnpj.replace(/(\d{3})(\d)/,"$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d{1,2})$/,"$1-$2");

    return cnpj;
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function getOptions(ammount = 50) {
    return Array.from({ length: ammount })
        .map((_, index) => new Date().getFullYear() - index);
}

function formatDate(data, formato) {
    if(data!=null){
        if (formato == 'pt-br') {
            return (data.substr(0, 10).split('-').reverse().join('/'));
        } else {
            return (data.substr(0, 10).split('/').reverse().join('-'));
        }
    }

}

///////
function formatarMoeda(e) {
    var valor = e;

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    valor.value = valor;
    if(valor === 'NaN') valor = '0,00';
    valor = 'R$ ' + valor;
    return valor;
}
function clearMoeda(e) {
    var valor = e;
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    return valor;
}

function objTest(obj) {
    if(JSON.stringify(obj) === '{}' || JSON.stringify(obj) === undefined || obj.substr(0, 17)==="file_get_contents") {
        obj = false;
    }
    return obj;
}
