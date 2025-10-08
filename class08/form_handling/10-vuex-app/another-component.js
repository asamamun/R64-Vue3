const AnotherComponent = {
    template: `
        <div>
            <h3>Another Component</h3>
            <div class="ui segment">
                <h4 class="ui header">Items from Store</h4>
                <div v-if="loading" class="ui active inline loader"></div>
                <ul>
                    <li v-for="item in items" class="item">{{ item }}</li>
                </ul>
                <p v-if="items.length === 0">No items in the store yet.</p>
            </div>
        </div>
    `,
    data() {
        return {
            loading: false
        }
    },
    computed: {
        items() {
            return this.$store.state.items;
        }
    },
    created() {
        // Load items when component is created
        this.loading = true;
        this.$store.dispatch('loadItems')
            .then(() => {
                this.loading = false;
            })
            .catch((error) => {
                console.log(error);
                this.loading = false;
            });
    }
}