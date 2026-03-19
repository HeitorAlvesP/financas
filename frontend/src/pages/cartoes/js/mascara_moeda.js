export const formatarMoeda = (valorDigitado) => {
    let valor = valorDigitado.replace(/\D/g, "");

    if (valor === "") {
        return "";
    }

    const valorNumerico = Number(valor) / 100;

    return valorNumerico.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};