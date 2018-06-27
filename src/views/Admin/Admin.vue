<template>
  <div class="admin">
    <Row>
      <i-col span="24">
        <Button
          type="success"
          :style="{margin: '16px 0'}"
          @click="onOpen">新增</Button>
        <i-input
          placeholder="TOKEN"
          v-model="token"
          @on-enter="getResources"
          :style="{width: '250px'}"/>
        <i-input
          :clearable="true"
          v-model="q"
          icon="ios-search"
          placeholder="搜索名称"
          @on-enter="getResources"
          @on-click="getResources"
          :style="{width: '250px'}"/>
      </i-col>
    </Row>
    <Table
      border
      size="small"
      :columns="columns"
      :data="data"/>
    <Page
      size="small"
      class="my-pager"
      :total="count"
      @on-change="onPaging"/>
    <Modal
      v-model="visible"
      :mask-closable="false"
      title="资源"
      width="80%">
      <Form
        ref="myForm"
        :model="formItem"
        :rules="ruleValidate"
        :label-width="50">
        <FormItem
          label="名称"
          prop="name">
          <i-input
            v-model="formItem.name"/>
        </FormItem>
        <FormItem label="首页">
          <i-input
            v-model="formItem.homepage"/>
        </FormItem>
        <FormItem label="配图">
          <i-input
            v-model="formItem.picture"/>
        </FormItem>
        <FormItem label="描述">
          <i-input
            type="textarea"
            v-model="formItem.describe"/>
        </FormItem>
        <Row>
          <i-col span="12">
            <FormItem label="类型">
              <RadioGroup v-model="formItem.type">
                <template v-for="(type, key) in $store.state.types">
                  <Radio
                    :key="key"
                    :label="key">{{ type.text }}</Radio>
                </template>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="VPN？">
              <i-switch
                v-model="formItem.vpn"
                size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          @click="onSubmit"
          type="info">提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="delVisible"
      width="240">
      <p
        style="color:#f60;text-align:center">
        <Icon type="information-circled"/>
        确定删除？
      </p>
      <div slot="footer">
        <Button
          long
          type="error"
          size="large"
          @click="onDelete">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import api from './api';

const defaultRecord = () => ({
  name: '',
  homepage: '',
  picture: '',
  describe: '',
  type: '',
  vpn: false,
});

export default {
  name: 'Admin',
  data() {
    return {
      token: '',
      q: '',
      visible: false,
      delVisible: false,
      loading: true,
      id: '', // 要删除项的 _id
      columns: [
        {
          title: '名称',
          key: 'name',
        },
        {
          title: '主页',
          key: 'homepage',
        },
        {
          title: '操作',
          key: 'actions',
          width: 100,
          render: (h, params) => h('div', [
            h('a', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  const { _index, _rowKey, ...ret } = params.row;
                  this.formItem = ret;
                  this.visible = true;
                },
              },
            }, '编辑'),
            h('a', {
              props: {
                type: 'error',
                size: 'small',
              },
              on: {
                click: () => {
                  // console.log('delete', params);
                  this.id = params.row._id;
                  this.delVisible = true;
                },
              },
            }, '删除'),
          ]),
        },
      ],
      pageNo: 1,
      data: [],
      count: 0,
      formItem: defaultRecord(),
      ruleValidate: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 获取列表数据
    async getResources() {
      const res = await api.getResources({
        token: this.token,
        pageNo: this.pageNo,
        q: this.q,
      });
      if (res) {
        this.data = res.results;
        this.count = res.count;
      }
    },
    // 删除
    async onDelete() {
      const res = await api.delResource({
        token: this.token,
        id: this.id,
      });
      if (res) {
        this.$Message.success('删除成功');
        this.delVisible = false;
        this.getResources();
      }
    },
    onOpen() {
      this.formItem = defaultRecord();
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onPaging(pageNo) {
      this.pageNo = pageNo;
      this.getResources();
    },
    async onSubmit() {
      const valid = await this.$refs.myForm.validate();
      if (valid) {
        const res = await api.updateResource({
          token: this.token,
          ...this.formItem,
        });
        if (res) {
          this.$Message.success('操作成功!');
          this.visible = false;
          this.getResources();
        }
      } else {
        this.$Message.error('表单不完整！');
        return null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.admin {
  padding: 8px 16px;
  .my-pager {
    margin-top: 16px;
  }
}
</style>

