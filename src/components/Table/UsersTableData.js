
import React, {useState} from "react";

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


