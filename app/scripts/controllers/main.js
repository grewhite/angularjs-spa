(function(ng, app) {
    'use strict';
    //Main Sections Controllers
    app.controller('MainCtrl', ['$scope', '$routeParams', '$location', '$cookies', '$cookieStore', '$sce', '$window', '$timeout', 'CampaignContentService', 'global', '$rootScope',
        function($scope, $routeParams, $location, $cookies, $cookieStore, $sce, $window, $timeout, CampaignContentService, global, $rootScope) {

            //Contact detail options
            $scope.detailsOptions = [
                'Bounty Hunting',
                'Planet Destruction',
                'New Government',
                'Rebel Removal',
                'Jedi Removal',
                'Birthday Parties',
                'Other'
            ];

            //Selected Contractor Route
            $scope.selectedContractor = $routeParams.contractor;

            //Default select option
            $scope.detailsOptionSelected = "Select";
            $scope.contractorsOptionSelected = "Select";


            const CService = CampaignContentService.success(function(data) {
                global.pageTitle = data.pageTitle;
                global.metaDescription = data.metaDescription;
                global.metaKeywords = data.metaKeywords;

                $scope.imgBaseUrl = global.imgBaseUrl;
                $scope.logo = data.logo;
                $scope.heroTitle = data.heroTitle;
                $scope.heroImage = data.heroImage;
                $scope.heroImageMobile = data.heroImageMobile;
                $scope.offerImage = data.offerImage;
                $scope.offerImageMobile = data.offerImageMobile;
                $scope.contactNumber = data.contactNumber;
                $scope.contactContent = $sce.trustAsHtml(data.contactContent);
                $scope.leftContent = $sce.trustAsHtml(data.leftContent);
                $scope.rightContent = $sce.trustAsHtml(data.rightContent);
                $scope.platinumLogo = data.platinumLogo;
                $scope.contractorTitle = $sce.trustAsHtml(data.contractorTitle);
                $scope.contractorContent = $sce.trustAsHtml(data.contractorContent);
                $scope.endorsementTitle = $sce.trustAsHtml(data.endorsementTitle);
                $scope.endorsementContent = $sce.trustAsHtml(data.endorsementContent);
                $scope.footerDisclaimer = $sce.trustAsHtml(data.footerDisclaimer);
                $scope.featuredContractors = data.featuredContractors.sort(function() {return 0.5 - Math.random()});
                $scope.otherContractors = data.otherContractors;
                $rootScope.featuredContractorsList = data.featuredContractors;
                $rootScope.selectedContractorHeading = "Match me with a Villain";
                $rootScope.selectedContractorCopy = "Please provide us with some information, and a representative will contact you and recommend a villain in your system.";
                $rootScope.chosenContractor = "None Selected";
                $rootScope.chosenShow = 0;

                angular.forEach($rootScope.featuredContractorsList, function(value, key) {
                  if($scope.selectedContractor === value.contractorId) {
                    $rootScope.chosenContractor = value.name;
                    $rootScope.selectedContractorHeading = "Contact " + value.name;
                    $rootScope.selectedContractorCopy = "Please provide us with some information.";
                    $rootScope.chosenShow = 1;
                  }
                });
            });

          //Display Contractor Pop-Up
          //Get Contractor variable.
          $rootScope.routeContractor = $routeParams.contractors;
          if($rootScope.routeContractor) {
            angular.element($window).bind('load', function() {
              angular.element('#' + $rootScope.routeContractor).modal('show');
              //
            });
          }
          //Maintain Scroll Position and sure new location start at top of page and reload pop-up on back button.
          $rootScope.$on('$routeChangeSuccess', function() {
            window.scrollTo(0, 0);
            if($rootScope.routeContractor) {
              setTimeout(function() {
                angular.element('#' + $rootScope.routeContractor).modal('show');
              }, 1000);
            }
          });


          //MenuTop height used in the sticky navigation bar function
            var menuTop = $(".hero-bar-sticky").offset().top + 30; //30 is the sum of the margin and border top of the menu
            //Sticky nav function
            function sticky() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > menuTop) {
                    $(".hero-bar-sticky").addClass("sticky");
                } else {
                    $(".hero-bar-sticky").removeClass("sticky");
                }
            }

            $(window).bind("scroll", function() {
                sticky();
            })

            $scope.getBgImage = function() {
                var mq = 'xs';
                if ($window.getComputedStyle) {
                    mq = $window.getComputedStyle(document.getElementsByClassName('sass-mq-pass-through')[0], ':after').getPropertyValue('content');
                }

                // Some browsers include quotes when examining
                mq = mq.replace(/"/g, '');

                var bg = '';
                if (mq === 'xs') {
                    $scope.offerImage = $scope.offerImageMobile;
                    return {
                        backgroundImage: 'url(' + $scope.imgBaseUrl + $scope.heroImageMobile + ')'
                    }
                } else {
                    return {
                        backgroundImage: 'url(' + $scope.imgBaseUrl + $scope.heroImage + ')'
                    }
                }
            }



            $scope.showProfile = function(scope) {
                var profileContent = $('#' + scope.contractor.contractorId).find('.modal-body').html();
                $('.container').children().hide();
                $('.container').append(profileContent);
                return false;
            }

            if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                $('.contractor-modal select').on('blur', function() {
                    var scrollTop = $(window).scrollTop();
                    var offsetTop = $('.contractor-modal content').offset().top;

                    if (Math.abs(scrollTop - offsetTop) > 1) {
                        $('.contractor-modal').css('position', 'absolute');
                        setTimeout(function() {
                            $('.contractor-modal').css('position', 'fixed');
                                $(window).scrollTop(1);
                        }, 1);
                    }

                    $(window).scrollTop(10);
                });
            }

            $scope.ContactContractorClick = function(name) {
                //Adding removal of Bootstraps Modal on page change.  There is bug with the version of BS and AngularJS
                var clink = "/contact/" + name;
                //$window.location.href = encodeURI(clink);
                $('#' + name).modal('toggle');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $location.path(clink);
            }

            $scope.callUsClick = function(num) {
                // Some browsers abort the request if the telephone number handler is pending
                setTimeout(function(){location.href = 'tel:' + num;}, 500);
            }
            $scope.findContractorClick = function(elm) {
              $location.path("/contact");
            }
        }
    ]);

    //Head Controller
    app.controller('HeadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'global', '$timeout',
        function($scope, $rootScope, $routeParams, $location, $http, global, $timeout) {
            //calling service
            //##TODO fix
            $timeout(function() {
                $scope.PageTitle = global.pageTitle;
                $scope.MetaDescription = global.metaDescription;
                $scope.MetaKeywords = global.metaKeywords;
            }, 1500);

            // Adding custom CSS rules for Windows Phone to allow for tall modal scrolling
            if (navigator.userAgent.match(/Windows Phone/i)) {
                $('head').append('<style type="text/css">@-ms-viewport { width: auto; } html,body { -ms-overflow-style: none !important; }</style>');
            }
        }
    ]);

    //Contact Form Controller
    app.controller('ContactFormCtrl', ['$scope', 'ContactService', '$routeParams', '$rootScope',
        function($scope, ContactService, $routeParams, $rootScope) {

          var selectedContractor = $routeParams.contractor;

            $scope.contact = {}
            $scope.showValidation = false;

            //Setting dropdowns default value - for the required checking
            $scope.contact.details = '';

            //Options selection change functions
            $scope.detailsOptionChange = function() {
                $scope.detailsOptionSelected = $scope.contact.details;
                $scope.detailsChange = "changed";
            }

            $scope.contractorsOptionChange = function() {
                $scope.contractorsOptionSelected = $scope.contact.contractor.companyName;
                $scope.contractorsChange = "changed";
            }

            $scope.projectSelection=[];
            // toggle selection for project type
            $scope.toggleSelection = function toggleSelection(project) {
                var idx = $scope.projectSelection.indexOf(project);
                // is currently selected
                if (idx > -1) {
                $scope.projectSelection.splice(idx, 1);
                }
                // is newly selected
                else {
                $scope.projectSelection.push(project);
                }
            };

            $scope.contactSubmit = function() {
                $scope.showValidation = true;

                if ($scope.pccContactForm.$valid) {
                    $('.profile_modal_form')
                        .addClass('submitting')
                        .find('button').attr('disabled', 'disabled').text("Sending...")
                        .end()
                        .find('input, checkbox').attr('disabled', 'disabled');

                    //Setting contractor value - since it's not required we must verify when it's empty

                  var msg = ''
                      + '&FirstName=' + escape($scope.contact.firstname) + ''
                      + '&LastName=' + escape($scope.contact.lastname) + ''
                      + '&Email=' + escape($scope.contact.email) + ''
                      + '&Phone=' + escape($scope.contact.phone) + ''
                      + '&Project=' + escape($scope.projectSelection) + ''
                      + '&Contractor=' + escape($rootScope.chosenContractor)
                    ;

                    var successResult = function(data) {
                        if (data.statusCode == 200) {
                            $('.profile_modal_form').hide();
                            $('.profile_modal_success').show();
                        } else {
                            errorResult(data);
                        }
                    }

                    var errorResult = function(data) {
                        $('.profile_modal_form').hide();
                        $('.profile_modal_error').show();
                    }

                    var ContService = ContactService.submit(msg);
                }
                return false;
            }
        }
    ]);
  //Contact Form Controller
  app.controller('ThanksCtrl', ['$scope', '$routeParams', '$rootScope',
    function($scope, $routeParams, $rootScope) {
    }]);

})(angular, SPA);
