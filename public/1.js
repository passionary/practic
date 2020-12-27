(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/EditModal.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/EditModal.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['table', 'item'],
  data: function data() {
    return {
      name: '',
      price: '',
      email: '',
      contact: '',
      authors: [],
      houses: []
    };
  },
  created: function created() {
    var _this = this;

    if (this.table == 'books') {
      this.name = this.item.name;
      this.price = this.item.price;
      axios.post('/get-options').then(function (res) {
        console.log(res);
        _this.authors = res.data.authors;
        _this.houses = res.data.houses;
      })["catch"](function (error) {
        console.log(error.response);
      });
    } else if (this.table == 'authors') {
      this.name = this.item.name;
      this.contact = this.item.contact;
      this.email = this.item.email;
    } else if (this.table == 'houses') {
      this.name = this.item.name;
    }
  },
  methods: {
    clearState: function clearState() {
      this.name = '';
      this.price = '';
      this.email = '';
      this.contact = '';
    },
    onSubmit: function onSubmit() {
      var _this2 = this;

      this.clearState();
      var formData = new FormData(document.querySelector('#form2'));
      formData.append('table', this.table);
      formData.append('id', this.item.id);
      axios.post('/update', formData).then(function (res) {
        console.log(res);

        _this2.$emit('onUpdateItem', res.data.item);
      })["catch"](function (error) {
        console.log(error.response);
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    setTimeout(function () {
      var elems = document.querySelectorAll('#modal2');
      var instances = M.Modal.init(elems, {
        onCloseStart: function onCloseStart() {
          var instance = M.Modal.getInstance(document.querySelector('#modal2'));
          instance.destroy();
        }
      });
      var instance = M.Modal.getInstance(document.querySelector('#modal2'));
      instance.open();
      _this3.name = _this3.item.name;
      _this3.price = _this3.item.price;
      var elems2 = document.querySelectorAll('select');
      var instances2 = M.FormSelect.init(elems2, {});
    }, 300);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! materialize-css */ "./node_modules/materialize-css/dist/js/materialize.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(materialize_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/Modal.vue");
/* harmony import */ var _EditModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditModal */ "./resources/js/EditModal.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      header: null,
      table: 'books',
      current: null,
      data: null,
      tables: [1, 2, 3]
    };
  },
  components: {
    Modal: _Modal__WEBPACK_IMPORTED_MODULE_1__["default"],
    EditModal: _EditModal__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  methods: {
    addItem: function addItem(item) {
      this.data.push(item);
    },
    deleteItem: function deleteItem(item) {
      var _this = this;

      axios.post('/delete', {
        table: this.table,
        id: item.id
      }).then(function (res) {
        var index = _this.data.findIndex(function (i) {
          return i.id == item.id;
        });

        if (index >= 0) {
          _this.data.splice(index, 1);
        }
      });
    },
    updateItem: function updateItem(item) {
      this.current = item;
    },
    updateItemHandler: function updateItemHandler(item) {
      var index = this.data.findIndex(function (i) {
        return i.id == item.id;
      });

      if (index >= 0) {
        this.data.splice(index, 1, item);
      }
    },
    changeTab: function changeTab(table) {
      this.table = table;
    },
    addRecord: function addRecord() {
      axios.post('/create', {
        table: table
      });
    },
    updateRecord: function updateRecord() {
      axios.post('/update', {
        table: table
      });
    },
    deleteRecord: function deleteRecord() {
      axios.post('/delete', {
        table: table
      });
    },
    loadTable: function loadTable(table) {
      var _this2 = this;

      axios.post('/read', {
        table: table
      }).then(function (res) {
        console.log(res);
        _this2.header = res.data.header;
        _this2.data = res.data.data;
      })["catch"](function (error) {
        console.log(error.response);
      });
    }
  },
  watch: {
    table: function table(val) {
      this.loadTable(val);
    }
  },
  created: function created() {
    this.loadTable('books');
  },
  mounted: function mounted() {
    var instance = materialize_css__WEBPACK_IMPORTED_MODULE_0___default.a.Tabs.init(document.querySelector('.tabs'), {
      swipeable: true
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Modal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Modal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['table'],
  data: function data() {
    return {
      name: '',
      price: '',
      email: '',
      contact: '',
      authors: [],
      houses: []
    };
  },
  methods: {
    clearState: function clearState() {
      this.name = '';
      this.price = '';
      this.email = '';
      this.contact = '';
    },
    onSubmit: function onSubmit() {
      var _this = this;

      this.clearState();
      var formData = new FormData(document.querySelector('#form'));
      formData.append('table', this.table);
      axios.post('/create', formData).then(function (res) {
        console.log(res);

        _this.$emit('onAddItem', res.data.item);
      })["catch"](function (error) {
        console.log(error.response);
      });
    }
  },
  created: function created() {
    var _this2 = this;

    if (this.table == 'books') {
      axios.post('/get-options').then(function (res) {
        console.log(res);
        _this2.authors = res.data.authors;
        _this2.houses = res.data.houses;
      })["catch"](function (error) {
        console.log(error.response);
      });
    }
  },
  mounted: function mounted() {
    setTimeout(function () {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
      var elems2 = document.querySelectorAll('select');
      var instances2 = M.FormSelect.init(elems2, {});
    }, 1000);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/EditModal.vue?vue&type=template&id=781f9095&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/EditModal.vue?vue&type=template&id=781f9095& ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.table == "books"
    ? _c("div", [
        _c(
          "a",
          {
            staticClass: "waves-effect waves-light btn modal-trigger",
            attrs: { href: "#modal1" }
          },
          [_vm._v("Создать")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "modal", attrs: { id: "modal2" } }, [
          _c("div", { staticClass: "modal-content" }, [
            _c(
              "form",
              { attrs: { id: "form2" }, on: { submit: _vm.onSubmit } },
              [
                _c("h4", [_vm._v("Редактирование книги")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.name,
                      expression: "name"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "name",
                    placeholder: "Введите название книги"
                  },
                  domProps: { value: _vm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.name = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.price,
                      expression: "price"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "price",
                    placeholder: "Введите цену книги"
                  },
                  domProps: { value: _vm.price },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.price = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "input-field col s12" }, [
                  _c(
                    "select",
                    { attrs: { name: "author_id", id: "" } },
                    _vm._l(_vm.authors, function(option) {
                      return _c(
                        "option",
                        { domProps: { value: option.value } },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(option.text) +
                              "\n                        "
                          )
                        ]
                      )
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "input-field col s12" }, [
                  _c(
                    "select",
                    { attrs: { name: "house_id", id: "" } },
                    _vm._l(_vm.houses, function(option) {
                      return _c(
                        "option",
                        { domProps: { value: option.value } },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(option.text) +
                              "\n                        "
                          )
                        ]
                      )
                    }),
                    0
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn-flat",
                attrs: { type: "submit", href: "#!" },
                on: { click: _vm.onSubmit }
              },
              [_vm._v("Добавить")]
            )
          ])
        ])
      ])
    : _vm.table == "authors"
    ? _c("div", [
        _c(
          "a",
          {
            staticClass: "waves-effect waves-light btn modal-trigger",
            attrs: { href: "#modal1" }
          },
          [_vm._v("Создать")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "modal", attrs: { id: "modal1" } }, [
          _c("div", { staticClass: "modal-content" }, [
            _c(
              "form",
              { attrs: { id: "form" }, on: { submit: _vm.onSubmit } },
              [
                _c("h4", [_vm._v("Новый автор")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.name,
                      expression: "name"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "name",
                    placeholder: "Введите имя"
                  },
                  domProps: { value: _vm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.name = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.contact,
                      expression: "contact"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "contact",
                    placeholder: "Введите контакты"
                  },
                  domProps: { value: _vm.contact },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.contact = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.email,
                      expression: "email"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "email",
                    placeholder: "Введите почту"
                  },
                  domProps: { value: _vm.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.email = $event.target.value
                    }
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn-flat",
                attrs: { type: "submit", href: "#!" },
                on: { click: _vm.onSubmit }
              },
              [_vm._v("Добавить")]
            )
          ])
        ])
      ])
    : _vm.table == "houses"
    ? _c("div", [
        _c(
          "a",
          {
            staticClass: "waves-effect waves-light btn modal-trigger",
            attrs: { href: "#modal1" }
          },
          [_vm._v("Создать")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "modal", attrs: { id: "modal1" } }, [
          _c("div", { staticClass: "modal-content" }, [
            _c(
              "form",
              { attrs: { id: "form" }, on: { submit: _vm.onSubmit } },
              [
                _c("h4", [_vm._v("Новое издание")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.name,
                      expression: "name"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "name",
                    placeholder: "Введите название книги"
                  },
                  domProps: { value: _vm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.name = $event.target.value
                    }
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn-flat",
                attrs: { type: "submit", href: "#!" },
                on: { click: _vm.onSubmit }
              },
              [_vm._v("Добавить")]
            )
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Index.vue?vue&type=template&id=147fb424&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Index.vue?vue&type=template&id=147fb424& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("ul", { staticClass: "tabs", attrs: { id: "tabs-swipe-demo" } }, [
        _c("li", { staticClass: "tab col s3" }, [
          _c(
            "a",
            {
              attrs: { href: "#test-swipe-1" },
              on: {
                click: function($event) {
                  return _vm.changeTab("books")
                }
              }
            },
            [_vm._v("Книги")]
          )
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "tab col s3" }, [
          _c(
            "a",
            {
              attrs: { href: "#test-swipe-2" },
              on: {
                click: function($event) {
                  return _vm.changeTab("authors")
                }
              }
            },
            [_vm._v("Авторы")]
          )
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "tab col s3" }, [
          _c(
            "a",
            {
              attrs: { href: "#test-swipe-3" },
              on: {
                click: function($event) {
                  return _vm.changeTab("houses")
                }
              }
            },
            [_vm._v("Издательства")]
          )
        ])
      ]),
      _vm._v(" "),
      _vm._l(_vm.tables, function(table, index) {
        return _c(
          "div",
          {
            staticClass: "col s12 light-blue lighten-2",
            attrs: { id: "test-swipe-" + (index + 1) }
          },
          [
            _c("table", [
              _c("thead", [
                _c(
                  "tr",
                  _vm._l(_vm.header, function(row) {
                    return _c("th", [_vm._v(_vm._s(row))])
                  }),
                  0
                )
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.data, function(row, index) {
                  return _c(
                    "tr",
                    { key: index },
                    [
                      _vm._l(Object.values(row), function(col) {
                        return _c("td", { key: col.name }, [
                          _vm._v(_vm._s(col))
                        ])
                      }),
                      _vm._v(" "),
                      _c("td", { attrs: { colspan: "2" } }, [
                        _c(
                          "a",
                          {
                            attrs: { href: "" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.updateItem(row)
                              }
                            }
                          },
                          [_vm._v("Редактировать")]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", { attrs: { colspan: "2" } }, [
                        _c(
                          "a",
                          {
                            attrs: { href: "" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.deleteItem(row)
                              }
                            }
                          },
                          [_vm._v("×")]
                        )
                      ])
                    ],
                    2
                  )
                }),
                0
              )
            ])
          ]
        )
      }),
      _vm._v(" "),
      _c("modal", {
        key: _vm.table,
        attrs: { table: _vm.table },
        on: { onAddItem: _vm.addItem }
      }),
      _vm._v(" "),
      _vm.current
        ? _c("edit-modal", {
            key: _vm.current && _vm.current.id,
            attrs: { table: _vm.table, item: _vm.current },
            on: { onUpdateItem: _vm.updateItemHandler }
          })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Modal.vue?vue&type=template&id=7413bf02&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Modal.vue?vue&type=template&id=7413bf02& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.table == "books"
    ? _c("div", [
        _c(
          "a",
          {
            staticClass: "waves-effect waves-light btn modal-trigger",
            attrs: { href: "#modal1" }
          },
          [_vm._v("Создать")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "modal", attrs: { id: "modal1" } }, [
          _c("div", { staticClass: "modal-content" }, [
            _c(
              "form",
              { attrs: { id: "form" }, on: { submit: _vm.onSubmit } },
              [
                _c("h4", [_vm._v("Новая книга")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.name,
                      expression: "name"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "name",
                    placeholder: "Введите название книги"
                  },
                  domProps: { value: _vm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.name = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.price,
                      expression: "price"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "price",
                    placeholder: "Введите цену книги"
                  },
                  domProps: { value: _vm.price },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.price = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "input-field col s12" }, [
                  _c(
                    "select",
                    { attrs: { name: "author_id", id: "" } },
                    _vm._l(_vm.authors, function(option) {
                      return _c(
                        "option",
                        { domProps: { value: option.value } },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(option.text) +
                              "\n                        "
                          )
                        ]
                      )
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "input-field col s12" }, [
                  _c(
                    "select",
                    { attrs: { name: "house_id", id: "" } },
                    _vm._l(_vm.houses, function(option) {
                      return _c(
                        "option",
                        { domProps: { value: option.value } },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(option.text) +
                              "\n                        "
                          )
                        ]
                      )
                    }),
                    0
                  )
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn-flat",
                attrs: { type: "submit", href: "#!" },
                on: { click: _vm.onSubmit }
              },
              [_vm._v("Добавить")]
            )
          ])
        ])
      ])
    : _vm.table == "authors"
    ? _c("div", [
        _c(
          "a",
          {
            staticClass: "waves-effect waves-light btn modal-trigger",
            attrs: { href: "#modal1" }
          },
          [_vm._v("Создать")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "modal", attrs: { id: "modal1" } }, [
          _c("div", { staticClass: "modal-content" }, [
            _c(
              "form",
              { attrs: { id: "form" }, on: { submit: _vm.onSubmit } },
              [
                _c("h4", [_vm._v("Новый автор")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.name,
                      expression: "name"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "name",
                    placeholder: "Введите имя"
                  },
                  domProps: { value: _vm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.name = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.contact,
                      expression: "contact"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "contact",
                    placeholder: "Введите контакты"
                  },
                  domProps: { value: _vm.contact },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.contact = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.email,
                      expression: "email"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "email",
                    placeholder: "Введите почту"
                  },
                  domProps: { value: _vm.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.email = $event.target.value
                    }
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn-flat",
                attrs: { type: "submit", href: "#!" },
                on: { click: _vm.onSubmit }
              },
              [_vm._v("Добавить")]
            )
          ])
        ])
      ])
    : _vm.table == "houses"
    ? _c("div", [
        _c(
          "a",
          {
            staticClass: "waves-effect waves-light btn modal-trigger",
            attrs: { href: "#modal1" }
          },
          [_vm._v("Создать")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "modal", attrs: { id: "modal1" } }, [
          _c("div", { staticClass: "modal-content" }, [
            _c(
              "form",
              { attrs: { id: "form" }, on: { submit: _vm.onSubmit } },
              [
                _c("h4", [_vm._v("Новое издание")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.name,
                      expression: "name"
                    }
                  ],
                  attrs: {
                    type: "text",
                    name: "name",
                    placeholder: "Введите название книги"
                  },
                  domProps: { value: _vm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.name = $event.target.value
                    }
                  }
                })
              ]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "modal-close waves-effect waves-green btn-flat",
                attrs: { type: "submit", href: "#!" },
                on: { click: _vm.onSubmit }
              },
              [_vm._v("Добавить")]
            )
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/EditModal.vue":
/*!************************************!*\
  !*** ./resources/js/EditModal.vue ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditModal_vue_vue_type_template_id_781f9095___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditModal.vue?vue&type=template&id=781f9095& */ "./resources/js/EditModal.vue?vue&type=template&id=781f9095&");
/* harmony import */ var _EditModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditModal.vue?vue&type=script&lang=js& */ "./resources/js/EditModal.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EditModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EditModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditModal_vue_vue_type_template_id_781f9095___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditModal_vue_vue_type_template_id_781f9095___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/EditModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/EditModal.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./resources/js/EditModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./EditModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/EditModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/EditModal.vue?vue&type=template&id=781f9095&":
/*!*******************************************************************!*\
  !*** ./resources/js/EditModal.vue?vue&type=template&id=781f9095& ***!
  \*******************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditModal_vue_vue_type_template_id_781f9095___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./EditModal.vue?vue&type=template&id=781f9095& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/EditModal.vue?vue&type=template&id=781f9095&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditModal_vue_vue_type_template_id_781f9095___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditModal_vue_vue_type_template_id_781f9095___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Index.vue":
/*!********************************!*\
  !*** ./resources/js/Index.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_147fb424___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=147fb424& */ "./resources/js/Index.vue?vue&type=template&id=147fb424&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_147fb424___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_147fb424___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Index.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./resources/js/Index.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Index.vue?vue&type=template&id=147fb424&":
/*!***************************************************************!*\
  !*** ./resources/js/Index.vue?vue&type=template&id=147fb424& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_147fb424___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=147fb424& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Index.vue?vue&type=template&id=147fb424&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_147fb424___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_147fb424___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Modal.vue":
/*!********************************!*\
  !*** ./resources/js/Modal.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_vue_vue_type_template_id_7413bf02___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.vue?vue&type=template&id=7413bf02& */ "./resources/js/Modal.vue?vue&type=template&id=7413bf02&");
/* harmony import */ var _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.vue?vue&type=script&lang=js& */ "./resources/js/Modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Modal_vue_vue_type_template_id_7413bf02___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Modal_vue_vue_type_template_id_7413bf02___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Modal.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./resources/js/Modal.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Modal.vue?vue&type=template&id=7413bf02&":
/*!***************************************************************!*\
  !*** ./resources/js/Modal.vue?vue&type=template&id=7413bf02& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_7413bf02___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=template&id=7413bf02& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Modal.vue?vue&type=template&id=7413bf02&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_7413bf02___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_7413bf02___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);