<template>
    <div class="course">
        <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <el-form-item label="学科编号">
                <el-input v-model="formInline.courseNo" placeholder="学科编号"></el-input>
            </el-form-item>
            <el-form-item label="学科名称">
                <el-input v-model="formInline.courseName" placeholder="学科名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" @click="handleClick(null,'add')">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                size="small"
                border
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="courseNo"
                    label="学科编号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="courseName"
                    label="学科名称"
            >
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="学分"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="courseHour"
                    label="学时"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="term"
                    label="学期"
                    width="120">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,'look')" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick(scope.row,'edit')" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="page"
                background
                layout="prev, pager, next"
                :total="tableData.length"
                :page-size="10"
                small
        >
        </el-pagination>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="40+'%'">
            <el-form :model="editForm" label-width="80px" :disabled="isDisable">
                <el-form-item label="学科编号" >
                    <el-input v-model="editForm.courseNo" placeholder="学科编号"></el-input>
                </el-form-item>
                <el-form-item label="学科名称">
                    <el-input v-model="editForm.courseName" placeholder="学科名称"></el-input>
                </el-form-item>
                <el-form-item label="学分">
                    <el-input v-model="editForm.score" placeholder="学分"></el-input>
                </el-form-item>
                <el-form-item label="学时">
                    <el-input v-model="editForm.courseHour" placeholder="学时"></el-input>
                </el-form-item>
                <el-form-item label="学期">
                    <el-input v-model="editForm.term" placeholder="学期"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Course",
        data() {
            return {
                formInline: {
                    courseNo: '',
                    courseName: ''
                },
                editForm: {
                    id: '',
                    courseNo: '',
                    courseName: '',
                    score: '',
                    courseHour: '',
                    term: ''
                },
                dialogFormVisible: false,
                dialogTitle: '',
                isDisable: false,
                operate: '', //标识：新增、查看、编辑
                tableData: [],
            }
        },
        mounted() {
            this.$axios.get('/api/course.json').then((res) => {
                this.tableData = res.data.data
            })
        },
        methods: {
            handleClick(row,ope) {
                this.operate = ope
                switch (ope) {
                    case 'add':
                        this.dialogTitle = '新增'
                        this.isDisable = false
                        this.emptyEditForm()
                        break
                    case 'look':
                        this.dialogTitle = '查看'
                        this.isDisable = true
                        this.editForm = Object.assign({},row)
                        break
                    case 'edit':
                        this.dialogTitle = '编辑'
                        this.isDisable = false
                        this.editForm = Object.assign({},row)
                        break
                }
                this.dialogFormVisible = true
            },
            onSubmit() {
                console.log('submit!');
            },
            handleSave() {
                switch (this.operate) {
                    case 'add':
                        // 此处调用后台接口的操作省略。。。。。。。

                        // 取id的最大值
                        var val = 0
                        if (this.tableData.length) {
                            val = Math.max.apply(Math,this.tableData.map(item => { return item.id }))
                        }
                        //赋值给editForm
                        this.editForm.id = val+1
                        // 把数据添加到tabledata
                        var obj = Object.assign({},this.editForm)
                        this.tableData.push(obj)
                        // 清空editform
                        this.emptyEditForm()
                        break
                    case 'edit':
                        // 此处调用后台接口的操作省略。。。。。。。

                        this.tableData.forEach((item) => {
                            if (item.id == this.editForm.id) {
                                item.score = this.editForm.score
                                item.courseName = this.editForm.courseName
                                item.courseNo = this.editForm.courseNo
                                item.courseHour = this.editForm.courseHour
                                item.term = this.editForm.term
                            }
                        })
                        break
                    case 'look':
                        break
                }
                // 关闭dialog
                this.dialogFormVisible = false
            },
            handleDelete(row) {
                this.$confirm('确定要删除该课程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    // 此处调用后台接口的操作省略。。。。。。。

                    // 数组中查找要删除的行索引
                    var idx = this.tableData.findIndex((item,i) => {
                        return item.id == row.id
                    })
                    this.tableData.splice(idx,1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {})
            },
            emptyEditForm() {
                for (let key in this.editForm) {
                    this.editForm[key] = ''
                }
            },
        }
    }
</script>

<style scoped>
    /deep/.el-table--border th.gutter:last-of-type {
        display: table-cell !important;
    }

    .page {
        margin-top: 20px;
    }

</style>