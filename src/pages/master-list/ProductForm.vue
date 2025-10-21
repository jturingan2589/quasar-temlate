<template>
  <PageHeader
    title="Create Product"
    subtitle="Create new product"
    :actions="[
      {
        icon: 'ti ti-refresh',
        iconType: 'icon',
        tooltip: 'Refresh',
        event: 'refresh',
      },
      {
        icon: 'ti ti-chevron-up',
        iconType: 'icon',
        tooltip: 'Collapse',
        event: 'collapse',
      },
    ]"
    @collapse="toggleHeader"
  >
    <template #buttons>
      <router-link
        to="/inventory/master-list"
        class="btn btn-secondary q-ml-sm"
      >
        <i data-feather="arrow-left" class="ti ti-arrow-left q-mr-sm"></i>
        Back to Product
      </router-link>
    </template>
  </PageHeader>

  <form @submit.prevent="submitForm" class="add-product-form">
    <div class="add-product">
      <div class="accordions-items-seperate" id="accordionSpacingExample">
        <div class="accordion-item border q-mb-lg">
          <h2 class="accordion-header" id="headingSpacingOne">
            <div
              class="accordion-button collapsed bg-white"
              data-bs-toggle="collapse"
              data-bs-target="#SpacingOne"
              aria-expanded="true"
              aria-controls="SpacingOne"
            >
              <div class="d-flex items-center justify-between flex-fill">
                <h5 class="d-flex items-center">
                  <i data-feather="info" class="text-primary q-mr-sm"></i
                  ><span>Product Information</span>
                </h5>
              </div>
            </div>
          </h2>
          <div
            id="SpacingOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingSpacingOne"
          >
            <div class="accordion-body border-top">
              <div class="row q-col-gutter-x-lg">
                <div class="col-sm-6 col-12">
                  <div class="q-mb-md">
                    <label class="form-label">
                      Store
                      <span class="text-danger q-ml-xs">*</span>
                    </label>
                    <BaseSelect
                      :options="ThomasStore"
                      v-model="selected.zero"
                    />
                  </div>
                </div>
                <div class="col-sm-6 col-12">
                  <div class="q-mb-md">
                    <label class="form-label"
                      >Warehouse
                      <span class="text-danger q-ml-xs"> *</span>
                    </label>
                    <BaseSelect
                      :options="WarhouseStore"
                      v-model="selected.one"
                    />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-x-lg">
                <div class="col-sm-6 col-12">
                  <div class="q-mb-md">
                    <label class="form-label">
                      Product Name
                      <span class="text-danger q-ml-xs">*</span>
                    </label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-sm-6 col-12">
                  <div class="q-mb-md">
                    <label class="form-label">
                      Slug
                      <span class="text-danger q-ml-xs">*</span>
                    </label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-x-lg">
                <div class="col-sm-6 col-12">
                  <div class="q-mb-md list position-relative">
                    <label class="form-label"
                      >SKU<span class="text-danger q-ml-xs">*</span></label
                    >
                    <input type="text" class="form-control list" />
                    <button type="submit" class="btn btn-primaryadd">
                      Generate
                    </button>
                  </div>
                </div>
                <div class="col-sm-6 col-12">
                  <div class="q-mb-md">
                    <label class="form-label"
                      >Selling Type<span class="text-danger q-ml-xs"
                        >*</span
                      ></label
                    >
                    <BaseSelect :options="Selling" v-model="selected.two" />
                  </div>
                </div>
              </div>
              <div class="addservice-info">
                <div class="row q-col-gutter-x-lg">
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <div class="add-newplus">
                        <label class="form-label">
                          Category<span class="text-danger q-ml-xs">*</span>
                        </label>
                        <a
                          href="javascript:void(0);"
                          data-bs-toggle="modal"
                          data-bs-target="#add-product-category"
                          ><i
                            data-feather="plus-circle"
                            class="plus-down-add"
                          ></i
                          ><span>Add New</span></a
                        >
                      </div>
                      <BaseSelect
                        :options="ChooseNew"
                        v-model="selected.three"
                        multiple
                        cleareable
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <label class="form-label">
                        Sub Category
                        <span class="text-danger q-ml-xs">*</span>
                      </label>
                      <BaseSelect
                        :options="SubCategory"
                        v-model="selected.four"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="add-product-new">
                <div class="row q-col-gutter-x-lg">
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <div class="add-newplus">
                        <label class="form-label"
                          >Brand<span class="text-danger q-ml-xs"
                            >*</span
                          ></label
                        >
                      </div>
                      <BaseSelect
                        :options="ChooseAdd"
                        v-model="selected.five"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <div class="add-newplus">
                        <label class="form-label"
                          >Unit<span class="text-danger q-ml-xs">*</span></label
                        >
                      </div>
                      <BaseSelect
                        :options="ChooseAddNew"
                        v-model="selected.six"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-x-lg">
                <div class="col-sm-6">
                  <div class="q-mb-md">
                    <div class="add-newplus">
                      <label class="form-label"
                        >Barcode Symbology<span class="text-danger q-ml-xs"
                          >*</span
                        ></label
                      >
                    </div>
                    <BaseSelect
                      :options="ChooseCode"
                      v-model="selected.seven"
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-6 col-12">
                  <div class="q-mb-md">
                    <label class="form-label">Barcode Symbology</label>
                    <BaseSelect
                      :options="ChooseCode"
                      v-model="selected.eight"
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-sm-6 col-12">
                  <div class="q-mb-md list position-relative">
                    <label class="form-label"
                      >Item Barcode<span class="text-danger q-ml-xs"
                        >*</span
                      ></label
                    >
                    <input type="text" class="form-control list" />
                    <button type="submit" class="btn btn-primaryadd">
                      Generate
                    </button>
                  </div>
                </div>
              </div>
              <!-- Editor -->
              <div class="col-lg-12">
                <div class="summer-description-box">
                  <label class="form-label">Description</label>
                  <div id="summernote">
                    <div class="editor pages-editor">
                      <div class="editor three-line">
                        <div class="editor-container">
                          <div ref="editorRef" class="quill-editor" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="fs-14 mt-1">Maximum 60 Words</p>
                </div>
              </div>
              <!-- /Editor -->
            </div>
          </div>
        </div>
        <div class="accordion-item border q-mb-lg">
          <h2 class="accordion-header" id="headingSpacingTwo">
            <div
              class="accordion-button collapsed bg-white"
              data-bs-toggle="collapse"
              data-bs-target="#SpacingTwo"
              aria-expanded="true"
              aria-controls="SpacingTwo"
            >
              <div
                class="d-flex items-center justify-content-between flex-fill"
              >
                <h5 class="d-flex items-center">
                  <i data-feather="life-buoy" class="text-primary q-mr-sm"></i
                  ><span>Pricing & Stocks</span>
                </h5>
              </div>
            </div>
          </h2>
          <div
            id="SpacingTwo"
            class="accordion-collapse collapse show"
            aria-labelledby="headingSpacingTwo"
          >
            <div class="accordion-body border-top">
              <div class="q-mb-mds">
                <label class="form-label"
                  >Product Type<span class="text-danger q-ml-xs">*</span></label
                >
                <div class="single-pill-product q-mb-md">
                  <ul class="nav nav-pills" id="pills-tab1" role="tablist">
                    <li class="nav-item" role="presentation">
                      <span
                        class="custom_radio me-4 mb-0 active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        <input
                          type="radio"
                          class="form-control"
                          name="payment"
                        />
                        <span class="checkmark"></span> Single Product</span
                      >
                    </li>
                    <li class="nav-item" role="presentation">
                      <span
                        class="custom_radio q-mr-sm mb-0"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        <input type="radio" class="form-control" name="sign" />
                        <span class="checkmark"></span> Variable Product</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div class="single-product">
                    <div class="row q-col-gutter-x-lg">
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Quantity<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Price<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Tax Type<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <BaseSelect
                            :options="ExclusiveType"
                            v-model="selected.nine"
                            placeholder="Exclusive"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Tax<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <BaseSelect
                            :options="ChooseTypeDis"
                            v-model="selected.ten"
                          />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Discount Type<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <BaseSelect
                            :options="Discount"
                            v-model="selected.eleven"
                          />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Discount Value<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <input class="form-control" type="text" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="q-mb-md">
                          <label class="form-label"
                            >Quantity Alert<span class="text-danger q-ml-xs"
                              >*</span
                            ></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div class="row select-color-add">
                    <div class="col-lg-6 col-sm-6 col-12">
                      <div class="q-mb-md">
                        <label class="form-label"
                          >Variant Attribute
                          <span class="text-danger q-ml-xs">*</span></label
                        >
                        <div class="row q-col-gutter-x-lg">
                          <div class="col-lg-10 col-sm-10 col-10">
                            <BaseSelect
                              :options="VariantChoose"
                              v-model="selected.twelve"
                            />
                          </div>
                          <div class="col-lg-2 col-sm-2 col-2 ps-0">
                            <div class="add-icon tab">
                              <a
                                class="btn btn-filter"
                                data-bs-toggle="modal"
                                data-bs-target="#add-product-category"
                                ><i class="feather feather-plus-circle"></i
                              ></a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="selected-hide-color" id="input-show">
                        <label class="form-label"
                          >Variant Attribute
                          <span class="text-danger q-ml-xs">*</span></label
                        >
                        <div class="row items-center">
                          <div class="col-lg-10 col-sm-10 col-10">
                            <div class="q-mb-md">
                              <input
                                class="input-tags form-control"
                                id="inputBox"
                                type="text"
                                data-role="tagsinput"
                                name="specialist"
                                value="red, black"
                              />
                            </div>
                          </div>
                          <div class="col-lg-2 col-sm-2 col-2 ps-0">
                            <div class="q-mb-md">
                              <a href="javascript:void(0);" class="remove-color"
                                ><i class="far fa-trash-alt"></i
                              ></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-body-table border" id="variant-table">
                    <div class="table-responsive">
                      <table class="table border">
                        <thead>
                          <tr>
                            <th>Variantion</th>
                            <th>Variant Value</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th class="no-sort"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="color"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="red"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="1234"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="product-quantity">
                                <span class="quantity-btn"
                                  ><i
                                    data-feather="minus-circle"
                                    class="feather-search"
                                  ></i
                                ></span>
                                <input
                                  type="text"
                                  class="quntity-input form-control"
                                  value="2"
                                />
                                <span class="quantity-btn"
                                  >+<i
                                    data-feather="plus-circle"
                                    class="plus-circle"
                                  ></i
                                ></span>
                              </div>
                            </td>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="50000"
                                />
                              </div>
                            </td>
                            <td class="action-table-data">
                              <div class="edit-delete-action">
                                <div class="input-block add-lists">
                                  <label class="checkboxs">
                                    <input type="checkbox" checked />
                                    <span class="checkmarks"></span>
                                  </label>
                                </div>
                                <a
                                  class="q-mr-sm p-2"
                                  href="javascript:void(0);"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-variation"
                                >
                                  <i
                                    data-feather="plus"
                                    class="feather-edit"
                                  ></i>
                                </a>
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-modal"
                                  class="p-2"
                                  href="javascript:void(0);"
                                >
                                  <i
                                    data-feather="trash-2"
                                    class="feather-trash-2"
                                  ></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="color"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="black"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="2345"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="product-quantity">
                                <span class="quantity-btn"
                                  ><i
                                    data-feather="minus-circle"
                                    class="feather-search"
                                  ></i
                                ></span>
                                <input
                                  type="text"
                                  class="quntity-input form-control"
                                  value="3"
                                />
                                <span class="quantity-btn"
                                  >+<i
                                    data-feather="plus-circle"
                                    class="plus-circle"
                                  ></i
                                ></span>
                              </div>
                            </td>
                            <td>
                              <div class="add-product">
                                <input
                                  type="text"
                                  class="form-control"
                                  value="50000"
                                />
                              </div>
                            </td>
                            <td class="action-table-data">
                              <div class="edit-delete-action">
                                <div class="input-block add-lists">
                                  <label class="checkboxs">
                                    <input type="checkbox" checked />
                                    <span class="checkmarks"></span>
                                  </label>
                                </div>
                                <a
                                  class="q-mr-sm p-2"
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-variation"
                                >
                                  <i
                                    data-feather="plus"
                                    class="feather-edit"
                                  ></i>
                                </a>
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-modal"
                                  class="p-2"
                                  href="javascript:void(0);"
                                >
                                  <i
                                    data-feather="trash-2"
                                    class="feather-trash-2"
                                  ></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border q-mb-lg">
          <h2 class="accordion-header" id="headingSpacingThree">
            <div
              class="accordion-button collapsed bg-white"
              data-bs-toggle="collapse"
              data-bs-target="#SpacingThree"
              aria-expanded="true"
              aria-controls="SpacingThree"
            >
              <div
                class="d-flex items-center justify-content-between flex-fill"
              >
                <h5 class="d-flex items-center">
                  <i data-feather="image" class="text-primary q-mr-sm"></i
                  ><span>Images</span>
                </h5>
              </div>
            </div>
          </h2>
          <div
            id="SpacingThree"
            class="accordion-collapse collapse show"
            aria-labelledby="headingSpacingThree"
          >
            <div class="accordion-body border-top">
              <div class="text-editor add-list add">
                <div class="col-lg-12">
                  <div class="add-choosen">
                    <div class="q-mb-md">
                      <div class="image-upload image-upload-two">
                        <input type="file" />
                        <div class="image-uploads">
                          <i
                            data-feather="plus-circle"
                            class="plus-down-add me-0"
                          ></i>
                          <h4>Add Images</h4>
                        </div>
                      </div>
                    </div>
                    <div class="phone-img">
                      <img
                        src="/app/img/products/phone-add-2.png"
                        alt="image"
                      />
                      <a href="javascript:void(0);"
                        ><vue-feather
                          type="x"
                          class="x-square-add remove-product"
                        ></vue-feather
                      ></a>
                    </div>

                    <div class="phone-img">
                      <img
                        src="/app/img/products/phone-add-1.png"
                        alt="image"
                      />
                      <a href="javascript:void(0);"
                        ><vue-feather
                          type="x"
                          class="x-square-add remove-product"
                        ></vue-feather
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border q-mb-lg">
          <h2 class="accordion-header" id="headingSpacingFour">
            <div
              class="accordion-button collapsed bg-white"
              data-bs-toggle="collapse"
              data-bs-target="#SpacingFour"
              aria-expanded="true"
              aria-controls="SpacingFour"
            >
              <div
                class="d-flex items-center justify-content-between flex-fill"
              >
                <h5 class="d-flex items-center">
                  <i data-feather="list" class="text-primary q-mr-sm"></i
                  ><span>Custom Fields</span>
                </h5>
              </div>
            </div>
          </h2>
          <div
            id="SpacingFour"
            class="accordion-collapse collapse show"
            aria-labelledby="headingSpacingFour"
          >
            <div class="accordion-body border-top">
              <div>
                <div
                  class="q-pa-md bg-light rounded d-flex items-center border q-mb-md"
                >
                  <div class="d-flex items-center">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="warranties"
                        value="option1"
                      />
                      <label class="form-check-label" for="warranties"
                        >Warranties</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="manufacturer"
                        value="option2"
                      />
                      <label class="form-check-label" for="manufacturer"
                        >Manufacturer</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="expiry"
                        value="option2"
                      />
                      <label class="form-check-label" for="expiry"
                        >Expiry</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row q-col-gutter-x-lg">
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <label class="form-label"
                        >Warranty<span class="text-danger q-ml-xs"
                          >*</span
                        ></label
                      >
                      <BaseSelect
                        :options="Warranty"
                        v-model="selected.thirteen"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md add-product">
                      <label class="form-label"
                        >Manufacturer<span class="text-danger q-ml-xs"
                          >*</span
                        ></label
                      >
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="row q-col-gutter-x-lg">
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <label class="form-label"
                        >Manufactured Date<span class="text-danger q-ml-xs"
                          >*</span
                        ></label
                      >
                      <div class="input-groupicon calender-input">
                        <a-date-picker
                          v-model:value="value1"
                          class="datetimepicker form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-12">
                    <div class="q-mb-md">
                      <label class="form-label">
                        Expiry On<span class="text-danger q-ml-xs">*</span>
                      </label>
                      <div class="input-groupicon calender-input">
                        <q-input
                          class="datetimepicker form-control"
                          v-model="date"
                          borderless
                          readonly
                          dense
                        >
                          <template #append>
                            <q-icon
                              name="event"
                              class="cursor-pointer"
                              @click="showCalendar = true"
                            />
                          </template>

                          <q-popup-proxy
                            v-model="showCalendar"
                            transition-show="scale"
                            transition-hide="scale"
                            cover
                          >
                            <q-date
                              v-model="date"
                              mask="YYYY-MM-DD"
                              @update:model-value="showCalendar = false"
                            >
                              <div class="row items-center justify-end q-pa-sm">
                                <q-btn
                                  flat
                                  label="Close"
                                  color="primary"
                                  v-close-popup
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="d-flex items-center justify-end q-mb-lg">
        <button type="button" class="btn btn-secondary q-mr-sm">Cancel</button>
        <button type="submit" class="btn btn-primary">Add Product</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Quill from "quill";

import PageHeader from "src/components/PageHeader.vue";
import "quill/dist/quill.snow.css";
import { useRouter } from "vue-router";
import BaseSelect from "src/components/BaseSelect.vue";

const router = useRouter();

const date = ref("");
const showCalendar = ref(false);

// Refs
const value1 = ref(null);
const value2 = ref(null);
const editorRef = ref<HTMLElement | null>(null);
const content = ref("");

// Visibility flags
const isVisible = ref(true);
const isVisible1 = ref(true);

// Selected values
const selected = reactive({
  zero: null,
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  seven: null,
  eight: null,
  nine: null,
  ten: null,
  eleven: null,
  twelve: null,
  thirteen: null,
});

// Options
const Distype = [
  { label: "Choose", value: "Choose" },
  { label: "Percentage", value: "Percentage" },
  { label: "Cash", value: "Cash" },
];

const VariantChoose = [
  { label: "Choose", value: "Choose" },
  { label: "Color", value: "Color" },
  { label: "Red", value: "Red" },
  { label: "Black", value: "Black" },
];

const ChooseTypeDis = [
  { label: "Choose", value: "Choose" },
  { label: "Percentage", value: "Percentage" },
  { label: "Cash", value: "Cash" },
];

const ExclusiveType = [
  { label: "Exclusive", value: "Exclusive" },
  { label: "Sales Tax", value: "Sales Tax" },
];

const ChooseCode = [
  { label: "Choose", value: "Choose" },
  { label: "Code34", value: "Code34" },
  { label: "Code35", value: "Code35" },
  { label: "Code36", value: "Code36" },
];

const Selling = [
  { label: "Choose", value: "Choose" },
  { label: "Transactional selling", value: "Transactional selling" },
  { label: "Solution selling", value: "Solution selling" },
];

const ChooseAddNew = [
  { label: "Choose", value: "Choose" },
  { label: "Kg", value: "Kg" },
  { label: "Pc", value: "Pc" },
];

const ChooseAdd = [
  { label: "Select", value: "Select" },
  { label: "Lenevo", value: "Lenevo" },
  { label: "Beats", value: "Beats" },
  { label: "Nike", value: "Nike" },
  { label: "Apple", value: "Apple" },
  { label: "Amazon", value: "Amazon" },
  { label: "Woodmart", value: "Woodmart" },
];

const SubSubCategory = [
  { label: "Select", value: "Select" },
  { label: "Fruits", value: "Fruits" },
  { label: "Computers", value: "Computers" },
  { label: "Shoes", value: "Shoes" },
];

const SubCategory = [
  { label: "Select", value: "Select" },
  { label: "Laptop", value: "Laptop" },
  { label: "Desktop", value: "Desktop" },
  { label: "Sneakers", value: "Sneakers" },
  { label: "Formals", value: "Formals" },
  { label: "Wearables", value: "Wearables" },
  { label: "Speakers", value: "Speakers" },
];

const ChooseNew = [
  { label: "Select", value: "Select" },
  { label: "Computers", value: "Computers" },
  { label: "Electronics", value: "Electronics" },
  { label: "Shoe", value: "Shoe" },
  { label: "Cosmetics", value: "Cosmetics" },
  { label: "Groceries", value: "Groceries" },
];

const WarhouseStore = [
  { label: "Select", value: "Select" },
  { label: "Lavish Warehouse", value: "Lavish Warehouse" },
  { label: "Quaint Warehouse", value: "Quaint Warehouse" },
  { label: "Traditional Warehouse", value: "Traditional Warehouse" },
  { label: "Cool Warehouse", value: "Cool Warehouse" },
  { label: "Overflow Warehouse", value: "Overflow Warehouse" },
];

const ThomasStore = [
  { label: "Select", value: "Select" },
  { label: "Electro Mart", value: "Electro Mart" },
  { label: "Quantum Gadgets", value: "Quantum Gadgets" },
  { label: "Gadget World", value: "Gadget World" },
  { label: "Volt Vault", value: "Volt Vault" },
  { label: "Elite Retail", value: "Elite Retail" },
  { label: "Prime Mart", value: "Prime Mart" },
  { label: "NeoTech Store", value: "NeoTech Store" },
];

const tags = [
  { label: "red", value: "red" },
  { label: "black", value: "black" },
];

const Warranty = [
  { label: "Choose", value: "Choose" },
  { label: "Percentage", value: "Percentage" },
  { label: "Cash", value: "Cash" },
];

const Discount = [
  { label: "Select", value: "Select" },
  { label: "Percentage", value: "Percentage" },
  { label: "Fixed", value: "Fixed" },
];

const submitForm = () => {
  router.push("/inventory/add-product");
};

const toggleHeader = () => {
  const header = document.getElementById("collapse-header");
  if (header) header.classList.toggle("active");
  document.body.classList.toggle("header-collapse");
};

// Initialize Quill editor
const initQuill = () => {
  if (!editorRef.value) return;

  const quill = new Quill(editorRef.value, {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
      ],
    },
  });

  quill.on("text-change", () => {
    content.value = quill.root.innerHTML;
  });
};

onMounted(() => {
  initQuill();
});
</script>
