---
templateKey: post
title: Integrate search and pagination into VueJS
date: 2019-09-14T02:49:11.505Z
---
The situation is that you have a list of movies and you want your component has 2 features which are search and paginating whatever you search for.

## Create component

All movies are stored in a variable called `list` and we should use `v-for` to loop this `list`.

```js
<template>
  <div>
    <div class="container">
      <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr class="thead-dark">
              <th scope="col">tconst</th>
              <th scope="col">Title Type</th>
              <th scope="col">Original Title</th>
              <th scope="col">Runtime Minutes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in displayedList" :key="index">
              <td>{{ item.tconst }}</td>
              <td>{{ item.titleType }}</td>
              <td>{{ item.originalTitle }}</td>
              <td>{{ item.runtimeMinutes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Pagination',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
  }
}
</script>
```

Now we can see all movies are displayed in the table.

## Search function

An input field is created for typing keywords

```js
<div class="form-group">
  <label for="query">Enter query</label>
  <input type="text" class="form-control" id="query" placeholder="Enter your query" v-model="s" />
</div>
```

Function `filteredList` is used for filtering the existing list followed keyword `s`. It is situated in `computed`, which means it runs automatically whenever user type any letter.

```js
data () {
  return {
    s: ''
  }
},
computed: {
  filteredList: function() {
    let resultList = []
    for (let item of this.list) {
      for (let property in item) {
        if (new RegExp(this.s.toLowerCase()).test(item[property])) {
          resultList.push(item)
          break
        }
      }
    }
    return resultList
  }
}
```

Because new filtered list is returned through `filteredList`, `&lt;template&gt;&lt;/template&gt;` should be updated

```js
<tr v-for="(item, index) in filteredList" :key="index">
```

## Pagination

We create paginating template

```js
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item" :class="{ 'disabled': this.currentPage <= 0 }" @click="prevPage"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item" :class="{ 'active': currentPage == page - 1 }" v-for="(page, index) in totalPages" :key="index" @click="moveToPage($event, page)"><a class="page-link" href="#">{{ page }}</a></li>
    <li class="page-item" :class="{ 'disabled': this.currentPage >= this.totalPages - 1 }" @click="nextPage"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
```

Variables `itemsPerPage` and `currentPage` are added to `data` to determine the maximum movies in each page and current page number. Then we calculate total pages from filtered list.

```js
data () {
  return {
    ...
    itemsPerPage: 5,
    currentPage: 0
  }
},
computed: {
  totalPages: function() {
    this.currentPage = 0
    return Math.ceil(this.filteredList.length / this.itemsPerPage)
  }
}
```

Next, we prepare list of movies in a specific page should be showed from filtered list

```js
computed: {
  displayedList: function() {
    return this.filteredList.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)
  },
}
```

Then, update which list we should loop in `<template></template>`

```js
<tr v-for="(item, index) in displayedList" :key="index">
```

The table now only shows 5 movies per page and paginating reflects the total pages based on the number of filtered movies.

Finally, some pagin click handlers are added.

```js
methods: {
  moveToPage: function(e, page) {
    e.preventDefault()
    if (0 <= page && page <= this.totalPages)
      this.currentPage = page - 1
  },
  prevPage: function(e) {
    e.preventDefault()
    if (this.currentPage > 0)
      this.currentPage--
  },
  nextPage: function(e) {
    e.preventDefault()
    if (this.currentPage < this.totalPages - 1)
      this.currentPage++
  }
}
```

We can search movies now. :))

![](/images/integrate-search-and-pagination-into-vuejs_01.jpg)

![](/images/integrate-search-and-pagination-into-vuejs_02.jpg)
