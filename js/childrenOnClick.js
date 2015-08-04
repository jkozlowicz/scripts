// Oftentimes it is desired to attach the save event to multiple
// elements within a container. For instance

<td class="tarif-wrapper">
    <div class="tarif">
        <i class="fa fa-plane fa-lg"></i>
        <span class="carrier">{{ tarif['carrier'] }}/span>
        <br>
        <span class="price">{{ tarif['price'] }}/span>
    </div>
</td>

$('#tarif-wrapper').on('click', '*', function() {
    // Will be attached to: div, i, and both spans
});

