import Swal from 'sweetalert2/dist/sweetalert2';

export const Alert = {
    successAlert(title, text) {
        if (!title) {
            title = 'Действие'
        }
        if (!text) {
            text = 'Успешно'
        }

        return Swal.fire({
            title: `${title}`,
            text: `${text}`,
            icon: 'success',
        })
    },

    errorAlert(title, text) {
        if (!title) {
            title = 'Действие'
        }
        if (!text) {
            text = 'Ошибка'
        }

        return Swal.fire({
            title: `${title}`,
            text: `${text}`,
            icon: 'error',
        })
    },

}