<template>
    <div v-if="table == 'books'">
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Создать</a>
        <div id="modal2" class="modal">
            <div class="modal-content">
                <form id="form2" @submit="onSubmit">
                    <h4>Редактирование книги</h4>
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
    props: ['table', 'item'],
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
    created() {                    
        if(this.table == 'books') {
            this.name = this.item.name;
            this.price = this.item.price;
            

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
        else if(this.table == 'authors') {
            this.name = this.item.name;
            this.contact = this.item.contact;
            this.email = this.item.email
        }
        else if(this.table == 'houses') {
            this.name = this.item.name;
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
            let formData = new FormData(document.querySelector('#form2'));
            formData.append('table', this.table);
            formData.append('id', this.item.id);
            
            axios.post('/update', formData)
            .then(res => {
                console.log(res);
                this.$emit('onUpdateItem', res.data.item);
            })
            .catch(error => {
                console.log(error.response);
            })
        }
    },
    mounted() {        
        setTimeout(() => {
            var elems = document.querySelectorAll('#modal2');
            var instances = M.Modal.init(elems, {
                onCloseStart: () => {
                    var instance = M.Modal.getInstance(document.querySelector('#modal2'));
                    instance.destroy();
                }
            });
            var instance = M.Modal.getInstance(document.querySelector('#modal2'));
            instance.open();
            this.name = this.item.name;
            this.price = this.item.price;
            
            var elems2 = document.querySelectorAll('select');
            var instances2 = M.FormSelect.init(elems2, {});
        }, 300)
    }
}
</script>