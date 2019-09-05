$(document).ready(()=>{
    $('.delete-client').on('click', (e)=>{
        $target =  $(e.target);
        //console.log($target.attr('data-id'));
        // const id = $target.attr('data-id');
        const id = jQuery(e.currentTarget).data("id");
        const admin = jQuery(e.currentTarget).data("id2");
        // console.log(jQuery(e.currentTarget).data("id"));
        console.log(id + " it works " + admin);
        $.ajax({
            type:'DELETE',
            url: '/admin/dashboard/deleteclient/'+encodeURIComponent(id),
            success: (response)=>{
                alert('Deleting Client');
                window.location.href='/admin/dashboard/clients/'+admin;
            },
            error: (err)=>{
                console.log(err);
            }
        });
    });
});

$(document).ready(()=>{
    $('.delete-cleaner').on('click', (e)=>{
        $target =  $(e.target);
        const id = jQuery(e.currentTarget).data("id");
        const admin = jQuery(e.currentTarget).data("id2");
        $.ajax({
            type:'DELETE',
            url: '/admin/dashboard/deletecleaner/'+encodeURIComponent(id),
            success: (response)=>{
                alert('Deleting Cleaner');
                window.location.href='/admin/dashboard/cleaners/'+admin;
            },
            error: (err)=>{
                console.log(err);
            }
        });
    });
});