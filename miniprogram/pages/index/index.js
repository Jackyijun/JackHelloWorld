Page({
    data: {
      message: ''
    },
    async fetchData() {
      await wx.request({
        url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&id="25907124"',
        method: 'GET',
        header: {
            'content-type': 'application/xml'
        },
        success: (res) => {
          this.setData({
            message: res.data.subjects[0]['title']
          });
        },
        fail: (err) => {
          console.error(err);
          this.setData({
            message: 'Failed to fetch data'
          });
        }
      });
    },
    onLoad() {
      console.log('Page loaded');
    }
  });
  