
import React, {useState} from "react";
import Avatar from "react-avatar";

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
    export const columns = [
    {title: 'ID', field: 'id', hidden: true,},
    {
        title: "Avatar",
        render: rowData => <Avatar maxInitials={2} size={40} round={true}
                                         name={`${rowData.name} ${rowData.surname}`}/>,
    },
    {title: 'Imię', field: 'name', },
    {title: 'Nazwisko', field: 'surname', },
    {title: 'Numer telefon', field: 'phone', },
    {title: 'E-mail', field: 'email', },
    {title: 'Typ zajęć', field: 'courseType', },
    {title: "Rodzaj karnetu", field: 'subscriptionType', },
    {title: 'Ważny do:', field: 'expireDate',},
]
export const localization = {
    body: {
        emptyDataSourceMessage: 'Brak danych do wyświetlenia',
        addTooltip: 'Dodaj użytkownika',
        deleteTooltip: 'Usuń',
        editTooltip: 'Edytuj',
        editRow: {
            deleteText: 'Jesteś pewien, że chcesz usunąć ?',
            saveTooltip: 'Zapisz',
            cancelTooltip: 'Anuluj'
        }
    },
    header: {
        actions: 'Akcje'
    },
    toolbar: {
        searchTooltip: 'Wyszukaj',
        searchPlaceholder: 'Znajdź użytkownika'
    },
    pagination: {
        labelDisplayedRows: `{from}-{to} do {count}`,
        labelRowsSelect: 'rzędów',
        firstTooltip: 'Pierwsza strona',
        lastTooltip: 'Ostatnia strona',
        nextTooltip: 'Następna strona',
        previousTooltip: 'Poprzednia strona',
    }
}


