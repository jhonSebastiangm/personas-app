$(document).ready(function() {
  // Global Settings
  let edit = false;

  // Testing Jquery
  console.log('jquery is working!');
  buscarpersonas();
  $('#persona-result').hide();


  // search key type event
  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'persona-search.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            console.log(response);
            let personas = JSON.parse(response);
            let template = '';
            personas.forEach(persona => {
              template += `
              <ul personaId="${persona.id}">
                     <li><a href="#" class="persona-item">${persona.NOMBRE}</a></li>
                     </ul>
                    ` 
            });
            $('#persona-result').show();
            $('#container').html(template);
          }
        } 
      })
    }
  });

  $('#persona-form').submit(e => {
    e.preventDefault();
    const postData = {
      DNI: $('#DNI').val(),
      NOMBRE: $('#NOMBRE').val(),
      FECNAC: $('#FECNAC').val(),
      DIR: $('#DIR').val(),
      Telefono: $('#Telefono').val(),
      id: $('#personaId').val()
    };
    const url = edit === false ? 'persona-add.php' : 'persona-edit.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
      console.log(response);
      alert(response);
      $('#persona-form').trigger('reset');
      buscarpersonas();
    });
  });

  function buscarpersonas() {
    $.ajax({
      url: 'personas-list.php',
      type: 'GET',
      success: function(response) {
        const personas = JSON.parse(response);
        let template = '';
        personas.forEach(persona => {
          template += `
                  <tr personaId="${persona.id}">
                  <td><a href="#" class="persona-item">
                  ${persona.DNI}
                  </a>
                  </td>
                  <td>
                  <a href="#" class="persona-item">
                    ${persona.NOMBRE} 
                  </a>
                  </td>
                  <td>${persona.FECNAC}</td>
                  <td>${persona.DIR}</td>
                  <td>${persona.TFNO}</td>
                  <td>
                    <button class="persona-delete btn btn-danger">
                     Eliminar 
                    </button>
                  </td>
                  </tr>
                `
        });
        $('#personas').html(template);
      }
    });
  }

  // Get a Single persona by Id 
  $(document).on('click', '.persona-item', function()  {
    let  element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('personaId');
    console.log(id);
    $.post('persona-single.php', {id}, (response) => {
      const persona = JSON.parse(response);
      $('#DNI').val(persona.DNI);
      $('#NOMBRE').val(persona.NOMBRE);
      $('#FECNAC').val(persona.FECNAC);
      $('#DIR').val(persona.DIR);
      $('#Telefono').val(persona.TFNO);
      $('#personaId').val(persona.id);
      edit = true;
    });
  });

  // Delete a Single persona
  $(document).on('click', '.persona-delete',function() {
    if(confirm('Estas seguro que quieres eliminar esta persona?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('personaId');
      $.post('persona-delete.php', {id}, (response) => {
        buscarpersonas();
      });
    }
  });
});
