//External Lib Import
import Swal from 'sweetalert2';
import i18n from '../locales/i18n';

class AleartMessage {
  static Delete(id, request) {
    return Swal.fire({
      title: i18n.t('Are you sure?'),
      text: i18n.t("You won't be able to revert this!"),
      icon: i18n.t('warning'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: i18n.t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        return request(id).then((res) => {
          if (res) {
            return true;
          }
        });
      }
    });
  }

  static DeleteHistory(id, hid, request) {
    return Swal.fire({
      title: i18n.t('Are you sure?'),
      text: i18n.t("You won't be able to revert this!"),
      icon: i18n.t('warning'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: i18n.t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        return request({ id, hid }).then((res) => {
          if (res) {
            return true;
          }
        });
      }
    });
  }

  static Update(coursesID, request) {
    return Swal.fire({
      title: 'Do you want to enrolled courses?',
      showCancelButton: true,
      confirmButtonText: 'yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return request({
          coursesID,
        }).then((res) => {
          Swal.fire('enrolled!', '', 'success');
          window.location.reload();
          return res;
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  static StatusUpdate(id, data, request) {
    return Swal.fire({
      title: 'Change Status',
      input: 'select',
      inputOptions: { PENDING: 'PENDING', REJECTED: 'REJECTED', APPROVED: 'APPROVED' },
      // inputValue: postBody.status,
    }).then((result) => {
      if (result.isConfirmed) {
        return request({ id, postBody: { ...data, status: result.value } }).then((res) => {
          return res;
        });
      }
    });
  }
}

export default AleartMessage;
