export  const getDateAfip = async (isoString) => {
    var tzo = -isoString.getTimezoneOffset(), dif = tzo >= 0 ? '+' : '-', pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return isoString.getFullYear() +
        '-' + pad(isoString.getMonth() + 1) +
        '-' + pad(isoString.getDate()) +
        'T' + pad(isoString.getHours()) +
        ':' + pad(isoString.getMinutes()) +
        ':' + pad(isoString.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

export async function addTimeExp(timeStr) {
    
    timeStr.setHours(timeStr.getHours() + 2);
    return await getDateAfip(timeStr)
    
}
