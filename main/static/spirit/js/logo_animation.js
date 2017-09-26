/**
 * Created by xenx on 1/23/17.
 */
// Global colors
var green = "#4bb199";
var yellow = "#f6e76a";
var purple = "#633b92";
var orange = "#ec8b6d";

// logo settings
var draw_time = 0.2;
var wait_time = 100;

var vertical = ['#first_yellow', '#third_yellow', '#six_yellow', '#eight_yellow', '#l1',
    '#l3', '#l5', '#l9', '#l11', '#f1', '#f3', '#l12', '#o1', '#o3', '#l16', '#l17', '#l21', '#l25',
    '#l23', '#g3', '#g1', '#l7'
];

var horisontal = ['#second_yellow', '#five_yellow', '#seven_yellow', '#l2', '#l4', '#l6', '#l8', '#l10', '#f2', '#f4',
    '#l13', '#l14', '#l15', '#o2', '#l18', '#o4', '#o5', '#l19', '#l20', '#l22', '#l24', '#g2', '#g4'
];

var attr_value = {};

$("document").ready(function () {


    for (el in vertical) {
        attr_value[vertical[el]] = $(vertical[el]).attr('height');
        $(vertical[el]).attr('height', '0');
    }

    for (el in horisontal) {
        attr_value[horisontal[el]] = $(horisontal[el]).attr('width');
        $(horisontal[el]).attr('width');
    }


    if ($("body").width() < 1050) {
        draw_time = 1;
        wait_time = 1;
    }
    $("#logo").ready(function () {
        $('#logo').css('display', 'block');
        $("#o5").css('display', 'none');


        for (el in vertical) {
            $(vertical[el]).attr('height', "0");
        }

        for (el in horisontal) {
            $(horisontal[el]).attr('width', "0");
        }


        function yellow2() {
            function yellow3() {
                function yellow5() {
                    function yellow6() {
                        function yellow7() {
                            function yellow8() {
                                setTimeout(function () {
                                    TweenLite.to("#eight_yellow", draw_time, {
                                        delay: 0,
                                        attr: {
                                            height: attr_value["#eight_yellow"]
                                        },
                                        ease: Power2.easeInOut
                                    });
                                }, wait_time);
                            }

                            setTimeout(function () {
                                TweenLite.to("#seven_yellow", draw_time, {
                                    delay: 0,
                                    attr: {
                                        width: attr_value["#seven_yellow"]
                                    },
                                    ease: Power2.easeInOut,
                                    onCompleteParams: yellow8()
                                });
                            }, wait_time);
                        }

                        setTimeout(function () {
                            TweenLite.to("#six_yellow", draw_time, {
                                delay: 0,
                                attr: {
                                    height: attr_value["#six_yellow"]
                                },
                                ease: Power2.easeInOut,
                                onCompleteParams: yellow7()
                            });
                        }, wait_time);
                    }

                    setTimeout(function () {
                        TweenLite.to("#five_yellow", draw_time, {
                            delay: 0,
                            attr: {
                                width: attr_value["#five_yellow"]
                            },
                            ease: Power2.easeOut,
                            onCompleteParams: yellow6()
                        });
                    }, wait_time);
                }

                setTimeout(function () {
                    TweenLite.to("#third_yellow", draw_time, {
                        delay: 0,
                        attr: {
                            height: attr_value["#third_yellow"]
                        },
                        ease: Power2.easeOut,
                        onCompleteParams: yellow5()
                    });
                }, wait_time);
            }

            setTimeout(function () {
                TweenLite.to("#second_yellow", draw_time, {
                    delay: 0,
                    attr: {
                        width: attr_value["#second_yellow"]
                    },
                    ease: Power2.easeOut,
                    onCompleteParams: yellow3()
                });
            }, wait_time);

        }

        function l2() {
            function l3() {
                function l4() {
                    function l5() {
                        function l6() {
                            function l7() {
                                function l8() {
                                    function l9() {
                                        function l10() {
                                            function l11() {
                                                function l12() {
                                                    function l13() {
                                                        function l14() {
                                                            function l22() {
                                                                function l23() {
                                                                    function g3() {
                                                                        function g4() {
                                                                            function g1() {
                                                                                setTimeout(function () {
                                                                                    TweenLite.to("#g1", draw_time, {
                                                                                        delay: 0,
                                                                                        attr: {
                                                                                            height: attr_value["#g1"]
                                                                                        },
                                                                                        ease: Power2.easeOut
                                                                                    });
                                                                                }, wait_time);
                                                                            }

                                                                            setTimeout(function () {
                                                                                TweenLite.to("#g4", draw_time, {
                                                                                    delay: 0,
                                                                                    attr: {
                                                                                        width: attr_value["#g4"]
                                                                                    },
                                                                                    ease: Power2.easeOut,
                                                                                    onCompleteParams: g1()
                                                                                });
                                                                            }, wait_time);
                                                                        }

                                                                        setTimeout(function () {
                                                                            TweenLite.to("#g3", draw_time, {
                                                                                delay: 0,
                                                                                attr: {
                                                                                    height: attr_value["#g3"]
                                                                                },
                                                                                ease: Power2.easeOut,
                                                                                onCompleteParams: g4()
                                                                            });
                                                                        }, wait_time);
                                                                    }

                                                                    setTimeout(function () {
                                                                        TweenLite.to("#g2", draw_time, {
                                                                            delay: 0,
                                                                            attr: {
                                                                                width: attr_value["#g2"]
                                                                            },
                                                                            ease: Power2.easeOut,
                                                                            onCompleteParams: g3()
                                                                        });
                                                                    }, wait_time / 2);

                                                                    function l24() {
                                                                        function l25() {
                                                                            setTimeout(function () {
                                                                                TweenLite.to("#l25", draw_time, {
                                                                                    delay: 0,
                                                                                    attr: {
                                                                                        height: attr_value["#l25"]
                                                                                    },
                                                                                    ease: Power2.easeOut
                                                                                });
                                                                            }, wait_time);
                                                                        }

                                                                        setTimeout(function () {
                                                                            TweenLite.to("#l24", draw_time, {
                                                                                delay: 0,
                                                                                attr: {
                                                                                    width: attr_value["#l24"]
                                                                                },
                                                                                ease: Power2.easeOut,
                                                                                onCompleteParams: l25()
                                                                            });
                                                                        }, wait_time);
                                                                    }

                                                                    setTimeout(function () {
                                                                        TweenLite.to("#l23", draw_time, {
                                                                            delay: 0,
                                                                            attr: {
                                                                                height: attr_value["#l23"]
                                                                            },
                                                                            ease: Power2.easeOut,
                                                                            onCompleteParams: l24()
                                                                        });
                                                                    }, wait_time);
                                                                }

                                                                setTimeout(function () {
                                                                    TweenLite.to("#l22", draw_time, {
                                                                        delay: 0,
                                                                        attr: {
                                                                            width: attr_value["#l22"]
                                                                        },
                                                                        ease: Power2.easeOut,
                                                                        onCompleteParams: l23()
                                                                    });
                                                                }, wait_time);
                                                            }

                                                            setTimeout(function () {
                                                                TweenLite.to("#l21", draw_time, {
                                                                    delay: 0,
                                                                    attr: {
                                                                        height: attr_value["#l21"]
                                                                    },
                                                                    ease: Power2.easeOut,
                                                                    onCompleteParams: l22()
                                                                });
                                                            }, 1.2 * wait_time);


                                                            function o1() {
                                                                function o4() {
                                                                    function o5() {
                                                                        setTimeout(function () {
                                                                            TweenLite.to("#o5", draw_time, {
                                                                                delay: 0,
                                                                                attr: {
                                                                                    width: attr_value["#o5"]
                                                                                },
                                                                                ease: Power2.easeOut
                                                                            });
                                                                            $("#o5").css('display', 'block');
                                                                        }, wait_time);


                                                                    }

                                                                    setTimeout(function () {
                                                                        TweenLite.to("#o4", draw_time, {
                                                                            delay: 0,
                                                                            attr: {
                                                                                width: attr_value["#o4"]
                                                                            },
                                                                            ease: Power2.easeOut,
                                                                            onCompleteParams: o5()
                                                                        });
                                                                    }, wait_time);
                                                                }

                                                                setTimeout(function () {
                                                                    TweenLite.to("#o3", draw_time, {
                                                                        delay: 0,
                                                                        attr: {
                                                                            height: attr_value["#o3"]
                                                                        },
                                                                        ease: Power2.easeOut,
                                                                        onCompleteParams: o4()
                                                                    });
                                                                }, wait_time);
                                                                setTimeout(function () {
                                                                    TweenLite.to("#o1", draw_time, {
                                                                        delay: 0,
                                                                        attr: {
                                                                            height: attr_value["#o1"]
                                                                        },
                                                                        ease: Power2.easeOut
                                                                    });
                                                                }, wait_time);
                                                            }

                                                            setTimeout(function () {
                                                                TweenLite.to("#o2", draw_time, {
                                                                    delay: 0,
                                                                    attr: {
                                                                        width: attr_value["#o2"]
                                                                    },
                                                                    ease: Power2.easeOut,
                                                                    onCompleteParams: o1()
                                                                });
                                                            }, wait_time);

                                                            function l18() {
                                                                function l19() {
                                                                    setTimeout(function () {
                                                                        TweenLite.to("#l19", draw_time, {
                                                                            delay: 0,
                                                                            attr: {
                                                                                width: attr_value["#l19"]
                                                                            },
                                                                            ease: Power2.easeOut
                                                                        });
                                                                    }, wait_time);
                                                                    setTimeout(function () {
                                                                        TweenLite.to("#l20", draw_time, {
                                                                            delay: 0,
                                                                            attr: {
                                                                                width: attr_value["#l20"]
                                                                            },
                                                                            ease: Power2.easeOut
                                                                        });
                                                                    }, wait_time);
                                                                }

                                                                setTimeout(function () {
                                                                    TweenLite.to("#l18", draw_time, {
                                                                        delay: 0,
                                                                        attr: {
                                                                            width: attr_value["#l18"]
                                                                        },
                                                                        ease: Power2.easeOut,
                                                                        onCompleteParams: l19()
                                                                    });
                                                                }, 1.2 * wait_time);
                                                            }

                                                            setTimeout(function () {
                                                                TweenLite.to("#l16", draw_time, {
                                                                    delay: 0,
                                                                    attr: {
                                                                        height: attr_value["#l16"]
                                                                    },
                                                                    ease: Power2.easeOut
                                                                });

                                                                TweenLite.to("#l17", draw_time, {
                                                                    delay: 0,
                                                                    attr: {
                                                                        height: attr_value["#l17"]
                                                                    },
                                                                    ease: Power2.easeOut,
                                                                    onCompleteParams: l18()
                                                                });
                                                            }, 30);

                                                        }

                                                        setTimeout(function () {
                                                            TweenLite.to("#l13", draw_time, {
                                                                delay: 0,
                                                                attr: {
                                                                    width: attr_value["#l13"]
                                                                },
                                                                ease: Power2.easeOut
                                                            });
                                                        }, wait_time);
                                                        setTimeout(function () {
                                                            TweenLite.to("#l14", draw_time, {
                                                                delay: 0,
                                                                attr: {
                                                                    width: attr_value["#l14"]
                                                                },
                                                                ease: Power2.easeOut
                                                            });
                                                        }, wait_time);
                                                        setTimeout(function () {
                                                            TweenLite.to("#l15", draw_time, {
                                                                delay: 0,
                                                                attr: {
                                                                    width: attr_value["#l15"]
                                                                },
                                                                ease: Power2.easeOut,
                                                                onCompleteParams: l14()
                                                            });
                                                        }, wait_time);
                                                    }

                                                    setTimeout(function () {
                                                        TweenLite.to("#l12", draw_time, {
                                                            delay: 0,
                                                            attr: {
                                                                height: attr_value["#l12"]
                                                            },
                                                            ease: Power2.easeOut,
                                                            onCompleteParams: l13()
                                                        });
                                                    }, wait_time);
                                                }

                                                setTimeout(function () {
                                                    TweenLite.to("#l9", draw_time, {
                                                        delay: 0,
                                                        attr: {
                                                            height: attr_value["#l9"]
                                                        },
                                                        ease: Power2.easeOut,
                                                        onCompleteParams: l12()
                                                    });
                                                }, wait_time)
                                            }

                                            setTimeout(function () {
                                                TweenLite.to("#l10", draw_time, {
                                                    delay: 0,
                                                    attr: {
                                                        width: attr_value["#l10"]
                                                    },
                                                    ease: Power2.easeOut,
                                                    onCompleteParams: l11()
                                                });
                                            }, wait_time)
                                        }

                                        setTimeout(function () {
                                            TweenLite.to("#l11", draw_time, {
                                                delay: 0,
                                                attr: {
                                                    height: attr_value["#l11"]
                                                },
                                                ease: Power2.easeOut,
                                                onCompleteParams: l10()
                                            });
                                        }, wait_time);

                                        function f3() {
                                            function f4() {
                                                function f1() {
                                                    setTimeout(function () {
                                                        TweenLite.to("#f1", draw_time, {
                                                            delay: 0,
                                                            attr: {
                                                                height: attr_value["#f1"]
                                                            },
                                                            ease: Power2.easeOut
                                                        });
                                                    }, wait_time)
                                                }

                                                setTimeout(function () {
                                                    TweenLite.to("#f4", draw_time, {
                                                        delay: 0,
                                                        attr: {
                                                            width: attr_value["#f4"]
                                                        },
                                                        ease: Power2.easeOut,
                                                        onCompleteParams: f1()
                                                    });
                                                }, wait_time)
                                            }

                                            setTimeout(function () {
                                                TweenLite.to("#f3", draw_time, {
                                                    delay: 0,
                                                    attr: {
                                                        height: attr_value["#f3"]
                                                    },
                                                    ease: Power2.easeOut,
                                                    onCompleteParams: f4()
                                                });
                                            }, wait_time)
                                        }

                                        setTimeout(function () {
                                            TweenLite.to("#f2", draw_time, {
                                                delay: 0,
                                                attr: {
                                                    width: attr_value["#f2"]
                                                },
                                                ease: Power2.easeOut,
                                                onCompleteParams: f3()
                                            });
                                        }, wait_time);

                                    }

                                    setTimeout(function () {
                                        TweenLite.to("#l8", draw_time, {
                                            delay: 0,
                                            attr: {
                                                width: attr_value["#l8"]
                                            },
                                            ease: Power2.easeOut,
                                            onCompleteParams: l9()
                                        });
                                    }, wait_time / 2);
                                }

                                setTimeout(function () {
                                    TweenLite.to("#l7", draw_time, {
                                        delay: 0,
                                        attr: {
                                            height: attr_value["#l7"]
                                        },
                                        ease: Power2.easeOut,
                                        onCompleteParams: l8()
                                    });
                                }, wait_time);
                            }

                            setTimeout(function () {
                                TweenLite.to("#l6", draw_time, {
                                    delay: 0,
                                    attr: {
                                        width: attr_value["#l6"]
                                    },
                                    ease: Power2.easeOut,
                                    onCompleteParams: l7()
                                });
                            }, wait_time);
                        }

                        setTimeout(function () {
                            TweenLite.to("#l5", draw_time, {
                                delay: 0,
                                attr: {
                                    height: attr_value["#l5"]
                                },
                                ease: Power2.easeOut,
                                onCompleteParams: l6()
                            });
                        }, wait_time);
                    }

                    setTimeout(function () {
                        TweenLite.to("#l4", draw_time, {
                            delay: 0,
                            attr: {
                                width: attr_value["#l4"]
                            },
                            ease: Power2.easeOut,
                            onCompleteParams: l5()
                        });
                    }, wait_time);
                }

                setTimeout(function () {
                    TweenLite.to("#l3", draw_time, {
                        delay: 0,
                        attr: {
                            height: attr_value["#l3"]
                        },
                        ease: Power2.easeOut,
                        onCompleteParams: l4()
                    });
                }, wait_time);
            }

            setTimeout(function () {
                TweenLite.to("#l2", draw_time, {
                    delay: 0,
                    attr: {
                        width: attr_value["#l2"]
                    },
                    ease: Power2.easeOut,
                    onCompleteParams: l3()
                });
            }, wait_time);
        }

        TweenLite.to("#l1", draw_time, {
            delay: 0,
            attr: {height: attr_value["#l1"]},
            ease: Power2.easeOut,
            onCompleteParams: l2()
        });

        setTimeout(function () {
            TweenLite.to("#first_yellow", draw_time, {
                delay: 0,
                attr: {
                    height: attr_value["#first_yellow"]
                },
                ease: Power2.easeOut,
                onCompleteParams: yellow2()
            });
        }, wait_time);
    });
});
/**
 * Created by xenx on 1/27/17.
 */