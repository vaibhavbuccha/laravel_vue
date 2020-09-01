<template>
    <div class="container card p-3">
        <div class="p-2">
            <h3>Create new post</h3>
            <hr>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card p-3">
                    <div class="form-group">
                        <label for="title">Title : </label>
                        <input type="text" class="form-control" name="" id="" placeholder="Blog Title..." >
                    </div>

                    <div class="form-group">
                        <label for="title">Description : </label>
                        <textarea name="" id="" class="form-control"  cols="30" placeholder="Enter your description here...."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="title">Photos : </label>
                        <input type="file" class="form-control-file" >
                    </div>

                    <div class="form-group">
                        <button class="btn btn-success" >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
