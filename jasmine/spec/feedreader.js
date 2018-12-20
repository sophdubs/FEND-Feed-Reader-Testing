
$(function() {

    //This suite is all about the RSS feeds definitions,
    //the allFeeds variable in our application.
    describe('RSS Feeds', function() {

        // This test makes sure that the allFeeds variable has been defined
        //and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //this test loops through each feed in the allFeeds object and ensures
        //it has a URL defined and that the URL is not empty.
        it('URL defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        //this test loops through each feed in the allFeeds object and ensures
        //it has a name defined and that the name is not empty.
         it('name defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    //This suite is all about the menu visibility (hidden vs visible)
    describe('The menu', function() {

        //body defined up here to avoid redundant code in the two tests.
        const body = document.querySelector('body');

        //This test makes sure the menu is hidden before being clicked.
        it('hidden menu', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         //This test makes sure that once the menu becomes visible once it is
         //clicked, and returns to its hidden state if clicked again.
        it('menu changes visibility on click', function() {
             const menu = document.querySelector('.menu-icon-link');
             menu.click();
             expect(body.classList.contains('menu-hidden')).toBe(false);
             menu.click();
             expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    //This suite is all about the Initial Entries loaded in the feed.
    describe('Initial Entries', function() {

        //this test deals with asynchronous functions (namely loadFeed), therefore
        //must use the Jasmine's beforeEach and done() functions.
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        //This test ensures that once the loadFeed function has completed its work, there is
        //at least one entry element in the feed container.
        it('should contain at least one entry', function(done){
            const entries = document.querySelector('.feed').querySelectorAll('.entry');
            expect(entries.length > 0).toBe(true);
            done();
        });
    });

    //This suite is all about New Feed Selection
    describe('New Feed Selection', function() {
        let feed1;
        let feed2;
        let feed = document.querySelector('.feed');

        //This code loads the feed once starting at 0, then saves the first item of the feed into a variable.\
        //Then, it loads the feed again starting at 1, and signals that the asynchronous code is done.
        beforeEach(function(done) {
            loadFeed(0, function(){
                feed1 = feed.children.item(0);
                loadFeed(1, function(){
                    feed2 = feed.children.item(0);
                    done();
                });
            });
        });

        //this test ensures that the content actually changes when the loadFeed function is called
        //by comparing the first item of the initial feed and the first item after the feed is reloaded.
        it('testing feed0', function(done) {
            console.log('feed1 = ' + feed1 + " feed2 = " + feed2);
            console.log(feed.children);
            expect(feed1.toString()).not.toEqual(feed2.toString());
            done();
        });
    });
}());
