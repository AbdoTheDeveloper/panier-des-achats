/*<script src="../../Jquery/TPS/Montre analogique/TP_montre_analogique_files/jquery-3.6.0.min.js">
    
</script>*/
// Dans cette Correction on va travailler avec la bibliothéque Jquery

$(document).ready(function () {
  $("label,select,table,input,button").hide().show(2000);
  // selection des éléments
  var Dropdown = $("select");
  var qt = $("input[type = number]:nth-of-type(1)");

  // Q2) Ecrire une fonction de validation des champs Console et quantité
  // ====================================================== Fonction de valdation ======================================================

  ;
  function validate() {
    Errors = { console: "", quntité: "" }
    si_commande_valide = true;
    //    selection des élements à valider
    selected_value = $("select option:selected").text();
    value_qt = $("input[type = number]:nth-of-type(1)").val();

    // controle de valeurs saisies
    if (selected_value == "choisir une console") {
      // affichge d'un message d'erreur
      // window.alert('choisir une console !!!')
      si_commande_valide = false;
      Errors.console = "vous devez choisir un  console valide ";
      $(".errors:first-of-type").html(Errors.console)
    }else{
        Errors.console = "";
        $(".errors:first-of-type").html(Errors.console);
    }
    if (value_qt < 1 || value_qt > 20) {
      // affichge d'un message d'erreur
      // window.alert('La quantité doit étre entre 1 Et 20  !!! ')
      si_commande_valide = false;
      Errors.quantité = "La quantité doit étre entre 1 Et 20  !!!";
      $(".errors:nth-of-type(2)").html(Errors.quantité);
    }else{
        Errors.quantité = "";
        $(".errors:nth-of-type(2)").html(Errors.quantité);
    }
  }
  // attachement de gestionnaires d'évenement
  $("button:nth-of-type(1)").click(validate);

  /* Q3) Ecrire une fonction remplirConsole qui permet de remplir le Dropdown des consoles à partir
des données Json ci-dessous 
===================================================== Fonction remplirConsole =====================================================

 on suppose que le texte Json et stocké dans une variable JsonData */

  var Commandes;

  function remplirConsole() {
    var JsonData = `{
        "consoles":[
            {"ref":"NINTENDO SWITH OLED","prix":4500,"mannettes":2,"image":"./images/img1.png"},
            {"ref":"PLAYSTATION CONSOLE PS5","prix":8500,"mannettes":1,"image":"./images/img2.png"},
            {"ref":"XBOX SERIES 512G","prix":4600,"mannettes":2,"image":"./images/img3.png"},
            {"ref":"PLAYSTATION PS4 1TO PRO","prix":5300,"mannettes":1,"image":"./images/img4.png"}
        ]
    }
    `;
    //   conversion des JSON au javascript
    Commandes = JSON.parse(JsonData);
    // Ajoute des références au Dropdown
    $.each(Commandes.consoles, (index, element) => {
      Dropdown.append(
        $(`<option style="color=chartreuse;" >${element.ref}</option>`) 
      );
    });
  }
  // appelle  brut de la fonction
  remplirConsole();

  /* Q4) Ecrire une fonction addConsoleToCart qui permet d'ajouter la console sélectionnée dans 
le tableau 'Panier des commandes' 
=========================================================== Fonction addConsoleToCart ================================================ */

  function addConsoleToCart() {
    if (si_commande_valide) {
      //    selection des élements
      var selected_value = $("select option:selected");

      //  obtention de l'indice du la commmande sélectionné
      commande_index = Commandes.consoles.findIndex(
        (element) => element.ref == selected_value.text()
      );
      commande = `<tr>
                    <td>${Commandes.consoles[commande_index].ref}</td>
                    <td>${qt.val()}</td>
                    <td><img width=100px height=100px src="${
                      Commandes.consoles[commande_index].image
                    }"></td>
                    <td ><button style='transform :translate(-50%,-50%);'>Supprimer</button></td>
                </tr>`;
      $("tbody").append(commande);

      // Agrandir la taille de la page
      $("fieldset").css(
        "height",
        `${
          Number(
            $("fieldset")
              .css("height")
              .slice(0, $("fieldset").css("height").indexOf("p"))
          ) + 100
        }px`
      );

      // attachement de gestionnaires d'évenement ( deleteConsoleFromCart)
      $.each($("tbody tr td:nth-child(4) button"), (index, element) => {
        // $(element).click(deleteConsoleFromCart).click(calculerPrixHT).click(calculerPrixTTC)
        $(element).click(deleteConsoleFromCart);
        $(element).click(JsonSerialiser)
        $(element).click(calculerPrixHT)
        $(element).click(calculerPrixTTC)
      });

      // redifinir la valeur du quantité
      $("input[type = number]:nth-of-type(1)").val("1");
    }
    $("button:nth-of-type(1)").parent().click(function(evt) {
      evt.preventDefault()
    })
  }

  // attachement de gestionnaire d'évenement (addConsoleConsoleToCart)
  $("button:nth-of-type(1)").click(addConsoleToCart).click(JsonSerialiser);

  /*Q5) Ecrire une fonction deleteConsoleFromCart qui permet de supprimer une console dans le 
        Tableau 'Panier des commandes' lorsqu'on clique sur le boutton supprimer 
=================================================== Fonction deleteCartFromConsole =================================================== */

  function deleteConsoleFromCart() {
    $(this).parent().parent().remove();
    i = 0 ;
    j = 0 ;
   
    console.log("prduct deleted succesfully .....");
    // $("fieldset").css(
    //   "height",
    //   `${
    //     Number(
    //       $("fieldset")
    //         .css("height")
    //         .slice(0, $("fieldset").css("height").indexOf("p"))
    //     ) - 30
    //   }px`
    // );
    
    
  }

  /*Q6) Ecrire une fonction CalculerPrixHT qui permet d'afficher le prix ht des consoles 
        dans le panier avec réduction de 10% 
===================================================== Function calculerPrixHT =======================================================*/

var  i = 0;
  function calculerPrixHT() {

    PrixHT = new Number(0);
    if ($('tbody tr').length != 0 && si_commande_valide ) {
      // selection des références
      références = $("tr td:nth-child(1)");
      // selection des quantités
      quantités = $("tr td:nth-child(2)");

      $.each(références, (index, tableData) => {
        // obtention de l'indice des console ajoutés au panier
        commande_index = Commandes.consoles.findIndex(
          (element) => element.ref == tableData.innerHTML
        );
        // calculer le prixHT
        PrixHT += Commandes.consoles[commande_index].prix * Number($(quantités[i]).html()) * 0.9;
      });
      // Affichage du prix HT
      $("#ht").val("");
      console.log(PrixHT)
      $("#ht").val(`${PrixHT.toFixed(2)} Dhs `);
      i++;
    } else if ($('tbody tr').length == 0) {
      PrixHT = 00;
      $("#ht").val(`${PrixHT} Dhs `);
      console.log('it\' s empty  ')
    }
    return PrixHT;
  }

  // attachement gestionnaire d'évenements (calulerPrixHT)
  $("button:nth-of-type(1)").click(calculerPrixHT);

  /* Q7) Ecrire une fonction calculerPrixTTC qui permet d'afficher le prix TTC des consoles dans 
le panier avec réduction de 10%   
 ======================================================== Fonction calculerPrixTTC =================================================== */

var  j = 0
  function calculerPrixTTC() {
    // // Calculer le prix TTC
    // // var PrixHT = calculerPrixHT()  ;
    // PrixTTC += PrixHT - (PrixHT * réduction) + (PrixHT * TVA);
    // // affichage de prixTTC
    // $("#ttc").val(`${PrixTTC.toFixed(2)} Dhs `);
    Prixttc = new Number(0)
    // return PrixTTC;
    TVA = 0.2;
    réduction = 0.1;
    if ($('tbody tr').length != 0 && si_commande_valide ) {
      // selection des références
     let  références = $("tr td:nth-child(1)");
      // selection des quantités
      let quantités = $("tr td:nth-child(2)");

      $.each(références, (index, tableData) => {
        // obtention de l'indice des console ajoutés au panier
        commande_index = Commandes.consoles.findIndex(
          (element) => element.ref == tableData.innerHTML
        );
        // calculer le prixHT
        Prixttc += (Commandes.consoles[commande_index].prix * Number($(quantités[j]).html()) * 0.9) * 1.1 ;
      });
      // Affichage du prix HT
      $("#ttc").val("");
      console.log(Prixttc)
      $("#ttc").val(`${Prixttc.toFixed(2)} Dhs `);
      j++;
    } else if($('tbody tr').length == 0){
      Prixttc = 00;
      $("#ttc").val(`${Prixttc} Dhs `);
      console.log('it\' s empty  ')
    }
  }

  // attachment de gestionnaire d'événement
  $("button:nth-of-type(1)").click(calculerPrixTTC);

  /* Q8) Ecrire une fonction JsonSon qui permet de convertir les consoles de panier
    sous-forme Json 
====================================================== Fonction JsonSerialiser =====================================================*/

  function JsonSerialiser() {
    var références = $("tr td:nth-child(1)");
    var prices = Commandes.consoles.map((elt) => elt.prix);
    if ($("tr").length != 0 && si_commande_valide) {
      var consoles = { consoles: new Array() };

      quantités = $("tr td:nth-child(2)");
      prices = Commandes.consoles.map((elt) => elt.prix);
      for (let j = 0; j < $("tbody tr").length; j++) {
        consoles.consoles.push({  console :  {
          code: $(références[j]).html(),
          qt: Number($(quantités[j]).html()),
          prix: prices[
            Commandes.consoles.findIndex(
              (element) => element.ref == $(références[j]).html()
            )
          ],
        }});
      }
      var JsonConsoles = JSON.stringify(consoles);
      console.log(JsonConsoles);
    }
  }

  // function resetPrices(){
  //      deleted_ref = Commandes.consoles.findIndex(element => element.ref == $(références[j]).html())
  //     console.log(deleted_console_image)
  //     $.each(Commandes.consoles,(index,element) => {
  //         deleted_console_index = Commandes.consoles.findIndex(element => element.image === deleted_item_image)
  //         deleted_console_price = Commandes.consoles[deleted_console_index].prix
  //         deleted_console_quantity = this.parentElement.previousElementSibling.previousElementSibling.innerTEXT
  //         prixht = $("#ht").val() - ((deleted_console_price * deleted_console_quantity)
  //         - (deleted_console_price * deleted_console_quantity * 0.1) )
  //         PrixTTC = $('#ttc').val() - (PrixHT - (PrixHT * réduction) + (PrixHT * TVA))
  //         $("#ht").val(prixht)
  //         $("#ht").val(prixTTC)
  //     })
  // }

//   function resetPrices() {
//     var prices = Commandes.consoles.map((elt) => elt.prix);
//     ref = $(this).parent().parent().children(0).html();
//     quantité = $(this).parent().prev().prev().html();
//     console.log(ref, quantité);
//     index = Commandes.consoles.findIndex((element) => element.ref == ref);
//     oldHT = Number($("#ht").val().slice(0, $("#ht").val().indexOf(" ")));
//     oldTTC = Number($("#ttc").val().slice(0, $("#ttc").val().indexOf(" ")));
//     console.log(oldHT, oldTTC);
//     unitPrice = Number(prices[index]) * quantité * 0.9;
//     NewHT = `${(oldHT - unitPrice).toFixed(2)} Dhs`;
//     NewTTC = PrixHT - PrixHT * réduction + PrixHT * TVA;

//     console.log(NewTTC);
//     NewTTC = `${(oldTTC - NewTTC).toFixed(2)} Dhs`;
//     setTimeout(function () {
//       $("#ht").val(NewHT);
//       $("#ttc").val(NewTTC);
//     }, 1500);
//     PrixHT = new Number(0);
//     PrixTTC = new Number(0);
//     i = 0;
//   }







 
});
