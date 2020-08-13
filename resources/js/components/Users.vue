<template>
    <div class="container">
        <!-- /.row -->
        <div class="row mt-5" >
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 250px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                      <button class="btn btn-success"  @click="newModal" >Add new <i class="fas fa-user-plus fa-fw"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id" >
                      <td>{{user.id}}</td>
                      <td>{{user.name | upText}}</td>
                      <td>{{user.email}}</td>
                      <td><span class="tag tag-success">{{user.type | upText}}</span></td>
                      <td>{{user.created_at | customDate}}</td>
                      <td>
                          <a @click="editModal(user)">
                              <i class="fa fa-edit blue"></i>
                          </a>
                          &nbsp;/&nbsp;
                          <a  @click="deleteUser(user.id)"  >
                              <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

      <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addNewLabel" v-if="editMode == true" >Edit User Info</h5>
              <h5 class="modal-title" id="addNewLabel" v-else >Add New User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
             <form @submit.prevent="editMode ? editUser() : createUser()" >
              <div class="modal-body">
                  <div class="form-group">
                    <input v-model="form.name" type="text" name="name"
                      placeholder="Name"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                      <has-error :form="form" field="name"></has-error>
                  </div>
                  <div class="form-group">
                    <input v-model="form.email" type="email" name="email"
                      placeholder="Email address"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                      <has-error :form="form" field="email"></has-error>
                  </div>
                  <div class="form-group">
                    <input v-model="form.password" type="password" name="password"
                      placeholder="Password"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                      <has-error :form="form" field="password"></has-error>
                  </div>
                  <div class="form-group">
                    <select 
                      name="type" 
                      class="form-control" 
                      id=""  
                      :class="{ 'is-invalid': form.errors.has('type') }"
                      v-model="form.type"
                    >
                      <option value="">Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Standard User</option>
                      <option value="author">Author</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <textarea v-model="form.bio" name="bio"
                      placeholder="Write something about your self..."
                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                      <has-error :form="form" field="bio"></has-error>
                    </textarea>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success" v-if="editMode == false" >Create</button>
                <button type="submit" class="btn btn-primary" v-else >Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
</template>


<script>
export default {
  data(){
    return{
      editMode: true,
      users: {},
      form: new Form({
        id: '',
        name: '',
        email: '',
        password: '',
        type: '',
        bio: '',
        photo: ''
      })
    }
  },
  methods:{
    editUser(){
      this.$Progress.start()
      // console.log('edit user');
      this.form.put(`api/user/${this.form.id}`)
      .then(()=>{
         $('#addNew').modal('hide')
          toast.fire({
            icon: 'success',
            title: 'User Updated successfully'
          });
        this.$Progress.finish()
      })
      .catch(() => {
        this.$Progress.fail()
      })
      fire.$emit('AfterCreate');
    },
    editModal(user){
      this.form.reset();
      this.editMode = true;
      $('#addNew').modal('show')
      this.form.fill(user)
    },
    newModal(){
      this.form.reset();
      this.editMode = false;
      $('#addNew').modal('show')
    },
    loadUsers(){
      axios.get('api/user').then(({data})=> (this.users = data.data));
    },
    createUser(){
      this.$Progress.start()
      this.form.post('api/user').then(res => {
        $('#addNew').modal('hide')
        toast.fire({
          icon: 'success',
          title: 'User added successfully'
        });
      });
      fire.$emit('AfterCreate');
      this.$Progress.finish()
    },
    deleteUser(id){
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        // send req to server
         if (result.value) {
          this.$Progress.start()
          this.form.delete('api/user/'+id).then(
          () =>{
              swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              fire.$emit('AfterCreate');
            }
          ).catch(()=>{
            swal('Failed','There is something wrong.','warning');
          })
          this.$Progress.finish()
        }
      });
    }
  },
  created(){
    this.loadUsers();
    fire.$on('AfterCreate',()=>{
        this.loadUsers();
    });
    // setInterval(this.loadUsers, 3000);
  }
}
</script>