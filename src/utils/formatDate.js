export function dataAtualFormatada(data) {
    const monthNames = ["January", "February", "Março", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    let dataInformation = new Date(data)
    let diaSemana = days[dataInformation.getDay().toString()]
    return diaSemana
    // let dataInformation = new Date(data),
    //     dia = dataInformation.getDate().toString(),
    //     diaSemana = days[dia]
    // return diaSemana
}