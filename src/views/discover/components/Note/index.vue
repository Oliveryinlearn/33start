<template>
    <div
        :class="['ss-note',{'red':curType.state==='1','yellow':curType.state==='2','blue':curType.state==='3'}]"
    >
        <div class="ss-type">{{curType.text}}</div>
        <h2>{{data.title}}</h2>
        <div class="ss-note-label">
            <div class="label">标签:</div>
            <div class="body">
                <span v-for="(item) in labelArr" :key="item.id">{{item.title}}</span>
            </div>
        </div>
        <div class="ss-note-des">
            <div class="label">描述:</div>
            <div class="body">{{(dec)}}</div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { maxText } from "@/utils/index";

import { TYPE } from "../../data/data";
import { LabelType } from "@/type/index";

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    setup(props) {
        //处理描述文字
        const subText = maxText(props.data.desc, 38);
        const dec = ref<string | null>(subText);

        const filterItemFunc = (item: string) => {
            return TYPE.filter(el => {
                return el.state === item;
            });
        };

        const item = filterItemFunc(props.data.state);

        const curType = ref(item[0]);

        //获得标签
        const handleLabel = (value: string): LabelType[] => {
            return value.indexOf(",") > -1
                ? value.split(",").map((el, index) => {
                      return {
                          title: el,
                          id: `${index}`
                      };
                  })
                : [
                      {
                          title: value,
                          id: "1"
                      }
                  ];
        };

        const labelArr = ref(handleLabel(props.data.label));

        return {
            dec,
            curType,
            labelArr
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "@/style/color.scss";
@import "@/style/theme.scss";

.ss-note {
    position: relative;
    top: 0;

    width: calc(25% - 10px);
    height: 7.2rem;
    box-sizing: border-box;
    padding: 1rem 1.5rem 1rem 1rem;
    margin-right: 13px;
    margin-bottom: 13px;

    background-color: $white;
    border-left: 6px solid $gray;

    transition: top 0.2s;
    h2 {
        position: relative;

        width: 80%;
        margin-bottom: 0.3rem;

        font-size: 1rem;
        font-weight: bold;
    }

    .ss-note-label,
    .ss-note-des {
        width: 100%;
        display: flex;

        .label,
        .body {
            font-size: 0.8rem;
        }
        .label {
            width: 2.6rem;

            color: $t-level-text;
        }
        .body {
            flex: 1;

            color: $t-level2-text;
        }
    }
    .ss-note-label {
        margin-bottom: 0.1rem;
    }
    .ss-note-label > .body > span {
        display: inline-block;
        margin-right: 0.5rem;
    }
    .ss-type {
        position: absolute;
        top: 0.6rem;
        right: 0;

        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.6rem;
        border-radius: 5rem 0 0 5rem;
        box-sizing: border-box;
        padding: 0 1.2rem 0 1.5rem;

        background-color: $gray;
        font-size: 0.8rem;
        letter-spacing: 2px;
    }
}
.ss-note:nth-child(4n) {
    margin-right: 0;
}
.ss-note:hover {
    top: -4px;

    box-shadow: 0 10px 30px rgba(175, 175, 175, 0.3);
    cursor: pointer;
}
.ss-note.red {
    border-left: 6px solid $main-theme-color;

    .ss-type {
        color: $white;
        background: linear-gradient(
                100deg,
                rgba(247, 198, 198, 0) 40%,
                rgba(252, 213, 213, 0.5) 50%,
                rgba(243, 172, 172, 0) 60%
            )
            $main-theme-color;
        background-size: 200% 100%;
        background-position-x: 140%;

        animation: 1s loading ease-in-out infinite;
    }
}
.ss-note.yellow {
    border-left: 6px solid $yellow;

    .ss-type {
        color: $white;
        background: $yellow;
    }
}
.ss-note.blue {
    border-left: 6px solid $blue;

    .ss-type {
        color: $white;
        background: $blue;
    }
}
@keyframes loading {
    to {
        background-position-x: -20%;
    }
}
</style>
