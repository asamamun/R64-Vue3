<template>
    <div class="day-event" :style="getEventBackgroundColor">
    <div>
    <span class="has-text-centered details">{{ event.details }}</span>
    <div class="has-text-centered icons">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
    </div>
    </div>
    </div>
    </template>
<script>
export default {
name: 'CalendarEvent',
props: ['event', 'day'],
computed: {
getEventBackgroundColor() {
const colors = ['#FF9999', '#85D6FF', '#99FF99','#FFCC99', '#B3B3B3','#FF9999', '#85D6FF', '#99FF99','#FFCC99', '#B399B3'];
let randomColor = colors[Math.floor(Math.random() * colors.length)];
return `background-color: ${randomColor}`;
}
}
}
</script>
<style lang="scss" scoped>
.day-event {
margin-top: 6px;
margin-bottom: 6px;
display: block;
color: #4C4C4C;
padding: 5px;
.details {
display: block;
}
.icons .fa {
padding: 0 2px;
}
input {
background: none;
border: 0;
border-bottom: 1px solid #FFF;
width: 100%;
&:focus {
outline: none;
}
}
}
</style>
    