<template>
    <div v-if="table == 'books'">
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Создать</a>
        <a class="waves-effect waves-light btn blue modal-trigger" href="#modal3">Просмотреть логи</a>
        <div id="modal1" class="modal">
            <div class="modal-content">
                <form id="form" @submit="onSubmit">
                    <h4>Новая книга</h4>
                    <input type="text" name="name" v-model="name" placeholder="Введите название книги">
                    <input type="text" name="price" v-model="price" placeholder="Введите цену книги">
                    <div class="input-field col s12">
                        <select name="author_id" id="">
                            <option v-for="option in authors" :value="option.value">
                                {{option.text}}
                            </option>
                        </select>
                    </div>
                    <div class="input-field col s12">
                        <select name="house_id" id="">
                            <option v-for="option in houses" :value="option.value">
                                {{option.text}}
                            </option>
                        </select>
                    </div>
                </form>                
            </div>
            <div class="modal-footer">
                <button @click="onSubmit" type="submit" href="#!" class="modal-close waves-effect waves-green btn-flat">Добавить</button>
            </div>
        </div>
    </div>
    <div v-else-if="table == 'authors'">
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Создать</a>
        <a class="waves-effect waves-light btn blue modal-trigger" href="#modal3">Просмотреть логи</a>
        <div id="modal1" class="modal">
            <div class="modal-content">
                <form id="form" @submit="onSubmit">
                    <h4>Новый автор</h4>
                    <input type="text" name="name" v-model="name" placeholder="Введите имя">
                    <input type="text" name="contact" v-model="contact" placeholder="Введите контакты">
                    <input type="text" name="email" v-model="email" placeholder="Введите почту">
                </form>
            </div>
            <div class="modal-footer">
                <button @click="onSubmit" type="submit" href="#!" class="modal-close waves-effect waves-green btn-flat">Добавить</button>
            </div>
        </div>
    </div>
    <div v-else-if="table == 'houses'">
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Создать</a>
        <a class="waves-effect waves-light btn blue modal-trigger" href="#modal3">Просмотреть логи</a>
        <div id="modal1" class="modal">
            <div class="modal-content">
                <form id="form" @submit="onSubmit">
                    <h4>Новое издание</h4>
                    <input type="text" name="name" v-model="name" placeholder="Введите название книги">
                </form>
            </div>
            <div class="modal-footer">
                <button @click="onSubmit" type="submit" href="#!" class="modal-close waves-effect waves-green btn-flat">Добавить</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['table'],
        data() {
            return {
                name: '',
                price: '',
                email: '',
                contact: '',
                authors: [],
                houses: []
            }
        },
        methods: {
            clearState() {
                this.name = '';
                this.price = '';
                this.email = '';
                this.contact = '';
            },
            onSubmit() {
                this.clearState();
                let formData = new FormData(document.querySelector('#form'));
                formData.append('table', this.table);
                
                axios.post('/create', formData)
                .then(res => {
                    console.log(res);
                    this.$emit('onAddItem', res.data.item);
                })
                .catch(error => {
                    console.log(error.response);
                })
            }
        },
        created() {
            if(this.table == 'books') {
                axios.post('/get-options')
                .then(res => {
                    console.log(res);
                    
                    this.authors = res.data.authors;
                    this.houses = res.data.houses
                })
                .catch(error => {
                    console.log(error.response);
                })
            }            
        },
        mounted() {
            setTimeout(() => {
                var elems = document.querySelectorAll('.modal');            
                var instances = M.Modal.init(elems, {});
                var elems2 = document.querySelectorAll('select');
                var instances2 = M.FormSelect.init(elems2, {});
            }, 1000)
        }
    }
</script>