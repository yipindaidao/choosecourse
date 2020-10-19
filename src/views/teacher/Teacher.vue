<template>
    <div class="course">
        <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.courseNo" placeholder="姓名"></el-input>
            </el-form-item>
<!--            <el-form-item label="学科名称">-->
<!--                <el-input v-model="formInline.courseName" placeholder="学科名称"></el-input>-->
<!--            </el-form-item>-->
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
                    width="40">
            </el-table-column>
            <el-table-column
                    fixed
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    v-if="false"
                    prop="id"
                    label="id"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="originalPosition"
                    label="原专业技术职称"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="education"
                    label="取得学历"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="degree"
                    label="取得学位"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="schoolsSpecialties"
                    label="就读学校及专业"
                    width="110">
            </el-table-column>
            <el-table-column
                prop="fundsSources"
                label="经费来源"
                width="100">
        </el-table-column>
            <el-table-column
                    prop="content"
                    label="进修内容"
                    width="100">
            </el-table-column> <el-table-column
                prop="time"
                label="进修时间"
                width="90">
        </el-table-column>
            <el-table-column
                    prop="completionStatus"
                    label="完成情况"
                    width="90">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope,'look')" type="text" size="small">查看</el-button>
                    <el-button @click="handleClick(scope,'edit')" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope)" type="text" size="small">删除</el-button>
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
<!--                <el-input v-model="editForm.id" type="hidden"></el-input>-->
                <el-form-item label="姓名" >
                    <el-input v-model="editForm.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="原专业技术职称">
                    <el-input v-model="editForm.originalPosition" placeholder="原专业技术职称"></el-input>
                </el-form-item>
                <el-form-item label="取得学历">
                    <el-input v-model="editForm.education" placeholder="取得学历"></el-input>
                </el-form-item>
                <el-form-item label="取得学位">
                    <el-input v-model="editForm.degree" placeholder="取得学位"></el-input>
                </el-form-item>
                <el-form-item label="就得学校及专业">
                    <el-input v-model="editForm.schoolsSpecialties" placeholder="就得学校及专业"></el-input>
                </el-form-item>
                <el-form-item label="经费来源">
                    <el-input v-model="editForm.fundsSources" placeholder="经费来源"></el-input>
                </el-form-item>
                <el-form-item label="进修内容">
                    <el-input v-model="editForm.content" placeholder="进修内容"></el-input>
                </el-form-item>
                <el-form-item label="进修时间">
                    <el-input v-model="editForm.time" placeholder="进修时间"></el-input>
                </el-form-item>
                <el-form-item label="完成情况">
                    <el-input v-model="editForm.completionStatus" placeholder="完成情况"></el-input>
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
                    name: '',
                    originalPosition: '',
                    education: '',
                    degree: '',
                    schoolsSpecialties: '',
                    fundsSources: '',
                    content: '',
                    time: '',
                    completionStatus: '',
                    idx: 0
                },
                dialogFormVisible: false,
                dialogTitle: '',
                isDisable: false,
                operate: '', //标识：新增、查看、编辑
                tableData: [],
            }
        },
        mounted() {
            this.$post('/furtherstudy/findall').then((res) => {
                this.tableData = res.data
            })
        },

        methods: {
            handleClick(sp,ope) {
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
                        this.editForm = Object.assign({},sp.row)
                        break
                    case 'edit':
                        this.dialogTitle = '编辑'
                        this.isDisable = false
                        this.editForm = Object.assign({idx: sp.$index},sp.row)
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
                        this.$post('/furtherstudy/add',this.editForm).then((res) => {
                            //this.tableData = res.data
                            // //赋值给editForm
                            this.editForm.id = res.data
                            // 把数据添加到tabledata
                            var obj = Object.assign({},this.editForm)
                            this.tableData.push(obj)
                            // 清空editform
                            this.emptyEditForm()
                        })
                        break
                    case 'edit':
                        console.log(this.editForm)
                        // 此处调用后台接口的操作省略。。。。。。。

                        // this.tableData.forEach((item) => {
                        //     if (item.id == this.editForm.id) {
                        //         item.name = this.editForm.name
                        //         item.originalPosition = this.editForm.originalPosition
                        //         item.education = this.editForm.education
                        //         item.degree = this.editForm.degree
                        //         item.schoolsSpecialties = this.editForm.schoolsSpecialties
                        //         item.fundsSources = this.editForm.fundsSources
                        //         item.content = this.editForm.content
                        //         item.time = this.editForm.time
                        //         item.completionStatus = this.editForm.completionStatus
                        //     }
                        // })
                        break
                    case 'look':
                        break
                }
                // 关闭dialog
                this.dialogFormVisible = false
            },
            handleDelete(sp) {
                this.$confirm('确定要删除该课程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(sp.$index)
                    // 此处调用后台接口的操作省略。。。。。。。
                    this.$post('/furtherstudy/delete',{id: sp.row.id}).then((res) => {
                        console.log('res:',res)
                        this.tableData.splice(sp.$index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
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