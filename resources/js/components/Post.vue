<template>
    <div class="container">
        <div align="right" class="p-1" >
            <a href="/newposts" class="btn btn-primary" >Create New Post</a>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-12 p-2">
                <div class="card">
                    <div class="card-header">Post Component</div>
                    <div class="card-body">
                        I'm an Post component.
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
