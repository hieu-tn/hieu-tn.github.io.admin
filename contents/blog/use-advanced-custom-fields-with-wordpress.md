---
templateKey: post
title: Use Advanced Custom Fields with Wordpress
date: 2019-09-14T02:48:43.453Z
excerpt: >-
  Wordpress is a PHP framework, usually used for blog and news. Sometimes, you
  might need more custom fields in order to do some logic on templates
---
Wordpress is a PHP framework, usually used for blog and news. Sometimes, you might need more custom fields in order to do some logic on templates such as text area and image. You should consider a <a href="https://codex.wordpress.org/Custom_Fields" target="_blank">tutorial</a> and some advices <a href="https://www.wpbeginner.com/wp-tutorials/wordpress-custom-fields-101-tips-tricks-and-hacks" target="_blank">wpbeginner</a>. For those, who don't get familiar with hundreds lines of code, <a href="https://www.advancedcustomfields.com" target="_blank">Advanced Custom Fields (AFC)</a> is a good option among others.

## Add new field groups

When ACF actives,

* navigate Custom Fields on the left sidebar
* click Add New

Under Location tab, you can choose where this field group should apply. You can add fields and choose any of field type.

![](/images/use-advanced-custom-fields-with-wordpress_01.jpg)

The above example shows that a field group was added to page template _Home_

## Call custom fields in template

To be continued with above example, assume that you have a structure like the following table:

| Order | Label            | Name             | Type     |
| ----- | ---------------- | ---------------- | -------- |
| 1     | Section Masthead | section_masthead | Repeater |
| 1     | Backgrounds      | backgrounds      | Repeater |
| 1     | Image            | image            | Image    |

In home template:

```php
<?php
/**
 * Template Name: Home
 */

get_header();

/**
 * Section masthead: BEGIN
 */
if( have_rows('section_masthead') ) :
  while( have_rows('section_masthead') ) : the_row();
    $backgrounds = get_sub_field('backgrounds');
    $backgrounds_data = [];
    foreach( $backgrounds as $background ) :
      $backgrounds_data[] = $background['image'];
    endforeach;
//    @TODO put some logic here
  endwhile;
endif;
/**
 * Section masthead: END
 */

get_footer();
```

*have_rows($field_name, $post_id)* function checks to see if a field (such as a Repeater or Flexible Content field) has any rows of data to loop over. This function is intended to be used in conjunction with *the_row()* to step through available values.

*get_sub_field($sub_field_name, $format_value)* function will return a sub field value from a repeater field or flexible content field loop. This function is used within a *have_rows()* loop.

## Conclusion

It cannot be denied that ACF brings many benefits to Wordpress user in a clean way. If you do not want to involve a developer every time text and images need to be updated, ACF will make it simple to allow you to make changes to a page or post. ACF also allow you to repeat or customize blocks, modules as many times you want with repeater field, flexible content field. Nonetheless, you might confused when using ACF on multiple server as it does not synchronize or sometimes, it does not store updates as coincident field name.
