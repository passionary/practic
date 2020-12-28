<template>
    <div class="main">
        <ul id="tabs-swipe-demo" class="tabs">
            <li class="tab col s3"><a @click="changeTab('books')" href="#test-swipe-1">Книги</a></li>
            <li class="tab col s3"><a @click="changeTab('authors')" href="#test-swipe-2">Авторы</a></li>
            <li class="tab col s3"><a @click="changeTab('houses')" href="#test-swipe-3">Издательства</a></li>
        </ul>
        <div v-for="(table, index) in tables" :id="'test-swipe-' + (index + 1)" class="col s12 indigo lighten-4">
            <table>
                <thead>
                    <tr>
                        <th v-for="row in header">{{row}}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in data" :key="index">
                        <td v-for="col in Object.values(row)" :key="col.name">{{col}}</td>
                        <td><a class="modal-trigger" @click="updateItem(row)" href="#modal2">Редактировать</a></td>
                        <td><a @click.prevent="deleteItem(row)" href=""><i class="material-icons">delete</i></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <modal 
            :table="table" 
            :key="table"
            @onAddItem="addItem"
        />
        <edit-modal 
            v-if="current"
            :table="table"
            :item="current"
            :key="current && current.id"
            @onUpdateItem="updateItemHandler"
        />
    </div>
</template>

<style>
    * {
        color: rgb(31, 31, 31);
    }
    .main {
        padding: 7px 25px;
    }
    .btn {
        margin-top: 16px;
    }
    .tabs-content {
        background: rgb(231, 231, 231);
        height: 850px;
    }
</style>

<script>
    import M from 'materialize-css';
    import Modal from './Modal';
    import EditModal from './EditModal';

    export default {
        data() {
            return {
                header: null,
                table: 'books',
                current: null,
                data: null,                
                tables: [1,2,3]
            }
        },
        components: {
            Modal,
            EditModal
        },
        methods: {
            addItem(item) {
                this.data.push(item);
            },
            deleteItem(item) {
                axios.post('/delete', {
                    table: this.table,
                    id: item.id
                })
                .then(res => {
                    const index = this.data.findIndex(i => i.id == item.id);
                
                    if(index >= 0) {
                        this.data.splice(index, 1);
                    }
                })
            },
            updateItem(item) {
                this.current = item;
            },
            updateItemHandler(item) {
                const index = this.data.findIndex(i => i.id == item.id);                
                
                if(index >= 0) {
                    this.data.splice(index, 1, item);
                }
            },
            changeTab(table) {
                this.table = table;
            },
            addRecord() {
                axios.post('/create', {
                    table
                })
            },
            updateRecord() {
                axios.post('/update', {
                    table
                })
            },
            deleteRecord() {
                axios.post('/delete', {
                    table
                })
            },
            loadTable(table) {
                axios.post('/read', {
                    table
                })
                .then(res => {
                    console.log(res);
                    this.header = res.data.header;
                    this.data = res.data.data;
                })
                .catch(error => {
                    console.log(error.response);
                })
            }
        },
        watch: {
            table(val) {
                this.loadTable(val);
            }
        },
        created() {
            this.loadTable('books');
        },
        mounted() {
            var instance = M.Tabs.init(document.querySelector('.tabs'), {
                swipeable: true
            });
        }
    }
</script>