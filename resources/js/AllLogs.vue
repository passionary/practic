<template>
    <div>
        <div id="modal3" class="modal">
            <div class="modal-content">
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Действие</th>
                            <th>Время</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data" :key="index">
                            <td v-for="col in Object.values(row)" :key="col.name">{{col}}</td>                            
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['table'],
    data() {
        return {
            data: null
        }
    },
    created() {
        this.loadTable();
    },
    methods: {
        loadTable() {
            axios.post('/logs', {
                table: this.table
            })
            .then(res => {
                this.data = res.data;
                console.log(res);
            })
            .catch(error => {
                console.log(error.response);
            })
        }
    },
    watch: {
        table(val) {
            this.loadTable();
        }
    },
    mounted() {
        var elems = document.querySelectorAll('#modal3');            
        var instances = M.Modal.init(elems, {});
    }
}
</script>